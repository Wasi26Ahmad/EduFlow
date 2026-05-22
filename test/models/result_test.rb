require "test_helper"

class ResultTest < ActiveSupport::TestCase
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

    @result =
      Result.new(
        user: @student,
        course: @course,
        marks: 85,
        approved: true
      )
  end

  test "valid result" do
    assert @result.valid?
  end

  test "marks cannot be less than 0" do
    @result.marks = -1

    assert_not @result.valid?
    assert_includes @result.errors[:marks],
                    "must be greater than or equal to 0"
  end

  test "marks cannot be greater than 100" do
    @result.marks = 101

    assert_not @result.valid?
    assert_includes @result.errors[:marks],
                    "must be less than or equal to 100"
  end

  test "marks can be nil" do
    @result.marks = nil

    assert @result.valid?
  end


  test "belongs to user" do
    association =
      Result.reflect_on_association(:user)

    assert_equal :belongs_to,
                 association.macro
  end

  test "belongs to course" do
    association =
      Result.reflect_on_association(:course)

    assert_equal :belongs_to,
                 association.macro
  end


  test "set_semester copies semester from course" do
    @result.valid?

    assert_equal @course.semester,
                 @result.semester
  end

  test "calculate_gpa sets correct gpa for marks between 80 and 100" do
    @result.marks = 85

    @result.save(validate: false)

    assert_equal 4.0,
                 @result.gpa
  end

  test "calculate_gpa sets correct gpa for marks between 75 and 79" do
    @result.marks = 77

    @result.save(validate: false)

    assert_equal 3.75,
                 @result.gpa
  end

  test "calculate_gpa sets correct gpa for marks between 70 and 74" do
    @result.marks = 72

    @result.save(validate: false)

    assert_equal 3.5,
                 @result.gpa
  end

  test "calculate_gpa sets correct gpa for marks between 65 and 69" do
    @result.marks = 67

    @result.save(validate: false)

    assert_equal 3.25,
                 @result.gpa
  end

  test "calculate_gpa sets correct gpa for marks between 60 and 64" do
    @result.marks = 62

    @result.save(validate: false)

    assert_equal 3.0,
                 @result.gpa
  end

  test "calculate_gpa sets correct gpa for marks between 55 and 59" do
    @result.marks = 57

    @result.save(validate: false)

    assert_equal 2.75,
                 @result.gpa
  end

  test "calculate_gpa sets correct gpa for marks between 50 and 54" do
    @result.marks = 52

    @result.save(validate: false)

    assert_equal 2.5,
                 @result.gpa
  end

  test "calculate_gpa sets correct gpa for marks between 45 and 49" do
    @result.marks = 47

    @result.save(validate: false)

    assert_equal 2.25,
                 @result.gpa
  end

  test "calculate_gpa sets correct gpa for marks between 40 and 44" do
    @result.marks = 42

    @result.save(validate: false)

    assert_equal 2.0,
                 @result.gpa
  end

  test "calculate_gpa sets correct gpa below 40" do
    @result.marks = 30

    @result.save(validate: false)

    assert_equal 0.0,
                 @result.gpa
  end


  test "approved_results scope exists" do
    assert_respond_to Result,
                      :approved_results
  end
end