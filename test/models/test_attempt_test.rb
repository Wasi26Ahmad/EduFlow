require "test_helper"

class TestAttemptTest < ActiveSupport::TestCase
  def setup
    @student =
      User.new(
        email: "student_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :student
      )

    @teacher =
      User.new(
        email: "teacher_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    @course =
      Course.new(
        teacher: @teacher,
        price: 1000,
        semester: 3
      )

    @test_model =
      Test.new(
        title: "Midterm Exam",
        course: @course,
        teacher: @teacher,
        start_time: 1.hour.from_now,
        end_time: 2.hours.from_now,
        duration_minutes: 60
      )

    @test_attempt =
      TestAttempt.new(
        user: @student,
        test: @test_model,
        status: :in_progress
      )
  end


  test "valid test attempt" do
    assert @test_attempt.valid?
  end


  test "belongs to user" do
    association =
      TestAttempt.reflect_on_association(:user)

    assert_equal :belongs_to,
                 association.macro
  end

  test "belongs to test" do
    association =
      TestAttempt.reflect_on_association(:test)

    assert_equal :belongs_to,
                 association.macro
  end

  test "has many answers dependent destroy" do
    association =
      TestAttempt.reflect_on_association(:answers)

    assert_equal :has_many,
                 association.macro

    assert_equal :destroy,
                 association.options[:dependent]
  end


  test "status enum values are correct" do
    expected_statuses = {
      "in_progress" => 0,
      "submitted" => 1,
      "auto_submitted" => 2,
      "evaluated" => 3
    }

    assert_equal expected_statuses,
                 TestAttempt.statuses
  end

  test "can set status to in_progress" do
    @test_attempt.status = :in_progress

    assert @test_attempt.in_progress?
  end

  test "can set status to submitted" do
    @test_attempt.status = :submitted

    assert @test_attempt.submitted?
  end

  test "can set status to auto_submitted" do
    @test_attempt.status = :auto_submitted

    assert @test_attempt.auto_submitted?
  end

  test "can set status to evaluated" do
    @test_attempt.status = :evaluated

    assert @test_attempt.evaluated?
  end
end