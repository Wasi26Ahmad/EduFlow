class EnrollmentsController < ApplicationController
  before_action :authenticate_user!

  def create
    # limit: max 4 approved courses
    if current_user.student?
      if current_user.enrollments.where(status: :approved).count >= 4
        redirect_to courses_path, alert: "Max 4 courses allowed"
        return
      end
    end

    enrollment = Enrollment.new(
      user: current_user,
      course_id: params[:course_id],
      status: :pending
    )

    if enrollment.save
      redirect_to courses_path, notice: "Enrollment request sent"
    else
      redirect_to courses_path, alert: "Failed to enroll"
    end

    if current_user.current_semester != @course.semester
      redirect_to courses_path,
                  alert: "You can only enroll in your current semester courses."
      return
    end
  end

  def index
    enrollments =
      if current_user.admin? || current_user.super_admin?
        Enrollment.where(status: :pending)
                  .includes(:user, :course)
      else
        current_user.enrollments
                    .includes(:course)
      end

    @pagy, @enrollments = pagy(
      enrollments.order(created_at: :desc),
      limit: 15
    )
  end

  def update
    enrollment = Enrollment.find(params[:id])

    if current_user.admin? || current_user.super_admin?
      enrollment.update(status: params[:status])

      redirect_to enrollments_path,
                  notice: "Updated"
    else
      redirect_to root_path,
                  alert: "Not authorized"
    end
  end
end