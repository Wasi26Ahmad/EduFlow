class Teacher::TestAttemptsController < ApplicationController
  before_action :authenticate_user!

  before_action :set_course
  before_action :set_test

  def index

    @attempts =
      @test.test_attempts
           .includes(:user)
           .order(created_at: :desc)

  end

  def show

    @attempt =
      @test.test_attempts.find(
        params[:id]
      )

  end

  def update

    @attempt =
      @test.test_attempts.find(
        params[:id]
      )

    total = @attempt.total_marks_obtained

    @attempt.answers.each do |answer|

      next unless answer.question.short?

      marks =
        params[:marks][answer.id.to_s].to_f

      answer.update!(
        obtained_marks: marks
      )

      total += marks

    end

    percentage =
      (total / @test.total_marks) * 100

    @attempt.update!(
      total_marks_obtained: total,
      percentage: percentage,
      status: :evaluated
    )

    redirect_to teacher_course_test_attempt_path(
                  @course,
                  @test,
                  @attempt
                ),
                notice: "Evaluation completed."

  end

  private

  def set_course
    @course = Course.find(params[:course_id])

    unless @course.teacher == current_user
      redirect_to root_path,
                  alert: "Unauthorized"
    end
  end

  def set_test
    @test =
      @course.tests.find(params[:test_id])
  end
end