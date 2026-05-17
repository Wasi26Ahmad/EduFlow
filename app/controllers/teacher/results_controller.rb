class Teacher::ResultsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_teacher

  def new
    @courses = current_user.teaching_courses

    @selected_course = nil
    @results = []
    @average_marks = 0
    @highest_marks = 0
    @lowest_marks = 0

    if params[:course_id].present?

      @selected_course = current_user
                           .teaching_courses
                           .includes(enrollments: :user)
                           .find_by(id: params[:course_id])

      if @selected_course.present?

        # Existing submitted results for graph + analytics
        @results = Result
                     .includes(:user)
                     .where(course_id: @selected_course.id)

        marks = @results
                  .map(&:marks)
                  .compact

        if marks.any?
          @average_marks =
            (marks.sum / marks.size.to_f).round(2)

          @highest_marks = marks.max
          @lowest_marks  = marks.min
        end

      end

    end
  end

  def create
    course = Course.find(params[:course_id])

    if course.teacher_id != current_user.id
      redirect_to root_path,
                  alert: "Not your course"
      return
    end

    if params[:marks].blank?
      redirect_to new_teacher_result_path(course_id: course.id),
                  alert: "No marks submitted"
      return
    end

    params[:marks].each do |user_id, marks|

      next if marks.blank?

      result = Result.find_by(
        user_id: user_id,
        course_id: course.id
      )

      if result

        result.update(
          marks: marks.to_f,
          approved: false
        )

      else

        Result.create(
          user_id: user_id,
          course_id: course.id,
          marks: marks.to_f,
          approved: false
        )

      end

    end

    redirect_to dashboard_path,
                notice: "Marks submitted successfully"
  end

  private

  def require_teacher
    unless current_user.teacher?
      redirect_to root_path,
                  alert: "Not authorized"
    end
  end
end