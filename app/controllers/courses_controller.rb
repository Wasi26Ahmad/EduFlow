class CoursesController < ApplicationController
  include Pagy::Backend

  before_action :authenticate_user!

  before_action :set_course, only: [:edit, :update]
  before_action :authorize_edit, only: [:edit, :update]
  before_action :authorize_course_access, only: [:show, :my_courses]

  def index
    courses =
      if current_user&.teacher?
        Course.where(teacher_id: current_user.id)
      else
        Course.all
      end

    @pagy, @courses = pagy(
      courses.order(created_at: :desc),
      limit: 12
    )
  end

  def edit
  end

  def update
    if @course.update(course_params)
      redirect_to courses_path, notice: "Course updated"
    else
      render :edit
    end
  end

  def my_courses
    @pagy, @courses = pagy(
      current_user.teaching_courses.order(created_at: :desc),
      limit: 10
    )
  end

  def show
    @course = Course.find(params[:id])

    @pagy, @students = pagy(
      @course.enrollments
             .where(status: :approved)
             .includes(:user)
             .order(created_at: :desc),
      limit: 20
    )
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def authorize_edit
    unless current_user.teacher? || current_user.admin? || current_user.super_admin?
      redirect_to root_path, alert: "Not authorized"
    end
  end

  # Admin role in course edit
  def course_params
    if current_user.admin? || current_user.super_admin?
      params.require(:course).permit(
        :title,
        :code,
        :course_code,
        :teacher_id,
        :price
      )
    else
      params.require(:course).permit(
        :title,
        :code,
        :course_code
      )
    end
  end

  def authorize_course_access
    return if action_name == "index"

    unless current_user&.teacher? ||
           current_user&.admin? ||
           current_user&.super_admin?
      redirect_to root_path, alert: "Not authorized"
    end
  end
end