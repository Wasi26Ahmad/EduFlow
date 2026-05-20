class Teacher::TestsController < ApplicationController
  before_action :authenticate_user!

  before_action :set_course,
                except: [:index]

  before_action :set_test,
                only: [
                  :attempts,
                  :finalize,
                  :destroy
                ]

  before_action :authorize_teacher!,
                except: [:index]

  def index
    @courses =
      current_user
        .teaching_courses
        .includes(:tests)
  end

  def new
    @test = @course.tests.new
  end

  def create
    @test = @course.tests.new(test_params)

    @test.teacher = current_user
    @test.semester = @course.semester

    if @test.save
      TestAnswerCacheService.load_answers(@test)

      redirect_to teacher_course_tests_path(@course),
                  notice: "Test has been created successfully."
    else
      render :new,
             status: :unprocessable_entity
    end
  end

  def attempts
    @attempts =
      @test
        .test_attempts
        .includes(:user)
        .order(created_at: :desc)

    @attempts_data =
      @attempts.map do |attempt|
        {
          id: attempt.id,
          student_name: attempt.user&.name,
          student_email: attempt.user&.email,
          status: attempt.status,
          marks: attempt.total_marks_obtained,
          submitted_at:
            attempt.submitted_at&.strftime(
              "%d %b %Y, %I:%M %p"
            ),
          evaluate_path:
            teacher_course_test_attempt_path(
              @course,
              @test,
              attempt
            )
        }
      end
  end

  def finalize
    if @test.finalized?
      redirect_to teacher_course_test_attempts_path(
                    @course,
                    @test
                  ),
                  alert: "Test has already been finalized."

      return
    end

    ActiveRecord::Base.transaction do

      @test.update!(
        finalized: true
      )

      TestAnswerCacheService.load_answers(@test)

    end

    redirect_to teacher_course_test_attempts_path(
                  @course,
                  @test
                ),
                notice: "Evaluation has been finalized successfully."
  rescue StandardError => e

    Rails.logger.error(
      "TEST FINALIZATION ERROR: #{e.message}"
    )

    redirect_to teacher_course_tests_path(@course),
                alert: "Failed to finalize test."
  end

  def destroy
    @test.destroy!

    redirect_to teacher_course_tests_path(@course),
                notice: "Test deleted successfully."
  rescue StandardError => e

    Rails.logger.error(
      "TEST DELETE ERROR: #{e.message}"
    )

    redirect_to teacher_course_tests_path(@course),
                alert: "Failed to delete test."
  end

  private

  def set_course
    @course =
      Course.find(params[:course_id])
  end

  def set_test
    @test =
      @course
        .tests
        .includes(
          questions: :question_options
        )
        .find(params[:id])
  end

  def authorize_teacher!
    unless @course.teacher == current_user

      redirect_to root_path,
                  alert: "You are not authorized."

    end
  end

  def test_params
    params.require(:test).permit(
      :title,
      :description,
      :start_time,
      :end_time,
      :duration_minutes,
      :total_marks,
      :published
    )
  end
end