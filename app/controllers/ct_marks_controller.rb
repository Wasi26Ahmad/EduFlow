class CtMarksController < ApplicationController
  before_action :authenticate_user!

  def index

    @course = Course.find(params[:course_id])

    unless current_user.student?
      redirect_to root_path, alert: "Access denied"
      return
    end

    enrolled = current_user.enrollments.exists?(course: @course)

    unless enrolled
      redirect_to courses_path,
                  alert: "You are not enrolled in this course"
      return
    end

    @tests = @course.tests.where(finalized: true)

    @attempts = TestAttempt
                  .includes(:test)
                  .where(
                    user: current_user,
                    test: @tests
                  )
  end
end