require "test_helper"

class EnrollmentTest < ActiveSupport::TestCase
  def setup
    @teacher =
      User.new(
        email: "teacher_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    @student =
      User.new(
        email: "student_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :student
      )

    @course =
      Course.new(
        teacher: @teacher,
        price: 1000,
        semester: 3
      )

    @enrollment =
      Enrollment.new(
        user: @student,
        course: @course,
        status: :pending
      )
  end

  test "valid enrollment" do
    assert @enrollment.valid?
  end

  test "belongs to user" do
    association =
      Enrollment.reflect_on_association(:user)

    assert_equal :belongs_to,
                 association.macro
  end

  test "belongs to course" do
    association =
      Enrollment.reflect_on_association(:course)

    assert_equal :belongs_to,
                 association.macro
  end


  test "set_semester copies semester from course" do
    @enrollment.valid?

    assert_equal @course.semester,
                 @enrollment.semester
  end


  test "status enum values are correct" do
    expected_statuses = {
      "pending" => 0,
      "approved" => 1
    }

    assert_equal expected_statuses,
                 Enrollment.statuses
  end

  test "default status is pending" do
    enrollment =
      Enrollment.new(
        user: @student,
        course: @course
      )

    assert_equal "pending",
                 enrollment.status
  end

  test "can set status to pending" do
    @enrollment.status = :pending

    assert @enrollment.pending?
  end

  test "can set status to approved" do
    @enrollment.status = :approved

    assert @enrollment.approved?
  end
end