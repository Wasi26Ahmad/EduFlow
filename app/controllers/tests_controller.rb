class TestsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_test,
                only: [:show, :start]

  def index

    enrolled =
      current_user.enrollments.exists?(
        course_id: @course.id,
        status: :approved
      )

    unless enrolled
      redirect_to enrollments_path,
                  alert: "You are not enrolled in this course"
      return
    end

    @tests =
      @course.tests
             .where(published: true)
             .where(
               "start_time <= ?",
               Time.current
             )
             .order(start_time: :desc)

  end

  def show
    unless eligible_for_test?
      redirect_to course_tests_path(@course),
                  alert: "You are not eligible."
      return
    end
  end


  def start
    unless eligible_for_test?
      redirect_to course_tests_path(@course),
                  alert: "You cannot start this test."
      return
    end

    existing_attempt =
      current_user.test_attempts.find_by(
        test: @test
      )

    if existing_attempt
      redirect_to test_attempt_path(existing_attempt),
                  alert: "Already started."
      return
    end

    attempt =
      current_user.test_attempts.create!(
        test: @test,
        started_at: Time.current,
        expires_at:
          Time.current +
            @test.duration_minutes.minutes,
        status: :in_progress
      )

    redirect_to test_attempt_path(attempt)

  end

  private

  def set_course
    @course =
      Course.find(params[:course_id])
  end

  def set_test
    @test =
      @course.tests.find(params[:id])
  end

  def eligible_for_test?

    enrolled =
      current_user.enrollments.exists?(
        course_id: @course.id,
        status: :approved
      )

    active_time =
      Time.current >= @test.start_time &&
      Time.current <= @test.end_time

    enrolled && active_time
  end
end