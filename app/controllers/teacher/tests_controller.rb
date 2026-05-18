class Teacher::TestsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course,
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
      redirect_to teacher_course_tests_path(@course),
                  notice: "Test created successfully"
    else
      render :new,
             status: :unprocessable_entity
    end
  end

  def attempts
    @test =
      @course.tests.find(params[:id])

    @attempts =
      @test
        .test_attempts
        .includes(:user)
        .order(created_at: :desc)

    @attempts_data =
      @attempts.map do |attempt|
        {
          id: attempt.id,

          # student info
          student_name: attempt.user&.name,
          student_email: attempt.user&.email,

          # attempt info
          status: attempt.status,
          marks: attempt.total_marks_obtained,
          submitted_at:
            attempt.submitted_at&.strftime(
              "%d %b %Y, %I:%M %p"
            ),

          # routes
          evaluate_path:
            teacher_course_test_attempt_path(
              @course,
              @test,
              attempt
            )
        }
      end
  end

  private

  def set_course
    @course =
      Course.find(params[:course_id])

    unless @course.teacher == current_user
      redirect_to root_path,
                  alert: "Unauthorized"
    end
  end

  def finalize
    @test = Test.find(params[:id])

    unless @test.teacher == current_user
      redirect_to root_path, alert: "Unauthorized"
      return
    end

    @test.update(finalized: true)

    redirect_to teacher_course_test_attempts_path(@test.course, @test),
                notice: "Evaluation finalized successfully."
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