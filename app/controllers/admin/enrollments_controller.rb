class Admin::EnrollmentsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def index
    enrollments = Enrollment.where(status: :pending)
                            .includes(:user, :course)
                            .order(created_at: :desc)

    @pagy, @enrollments = pagy(
      enrollments,
      limit: 15
    )
  end

  def update
    enrollment = Enrollment.find(params[:id])

    enrollment.update(status: params[:status])

    redirect_to admin_enrollments_path,
                notice: "Updated"
  end
end