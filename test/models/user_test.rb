require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @unique_id = SecureRandom.hex(4)

    @user =
      User.new(
        email: "student_#{@unique_id}@example.com",
        password: "password123",
        role: :student
      )
  end


  test "valid user" do
    assert @user.valid?
  end

  test "role defaults to student when nil" do
    user =
      User.create!(
        email: "default_role_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: nil
      )

    assert_equal "student",
                 user.role
  end

  test "default role is student" do
    user =
      User.create!(
        email: "default_#{SecureRandom.hex(4)}@example.com",
        password: "password123"
      )

    assert_equal "student",
                 user.role
  end

  test "student is not auto approved" do
    user =
      User.create!(
        email: "student2_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :student
      )

    assert_not user.approved
  end

  test "teacher is auto approved" do
    user =
      User.create!(
        email: "teacher_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    assert user.approved
  end

  test "admin is auto approved" do
    user =
      User.create!(
        email: "admin_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :admin
      )

    assert user.approved
  end

  test "super admin is auto approved" do
    user =
      User.create!(
        email: "superadmin_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :super_admin
      )

    assert user.approved
  end


  test "roles enum values are correct" do
    expected_roles = {
      "super_admin" => 0,
      "admin" => 1,
      "teacher" => 2,
      "student" => 3
    }

    assert_equal expected_roles,
                 User.roles
  end



  test "admin_or_higher returns true for admin" do
    @user.role = :admin

    assert @user.admin_or_higher?
  end

  test "admin_or_higher returns true for super_admin" do
    @user.role = :super_admin

    assert @user.admin_or_higher?
  end

  test "admin_or_higher returns false for teacher" do
    @user.role = :teacher

    assert_not @user.admin_or_higher?
  end

  test "admin_or_higher returns false for student" do
    @user.role = :student

    assert_not @user.admin_or_higher?
  end


  test "cgpa returns 0 when no approved results exist" do
    assert_equal 0,
                 @user.cgpa
  end

  test "cgpa returns average approved gpa rounded to 2 decimals" do
    teacher =
      User.create!(
        email: "cgpa_teacher_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    course1 =
      Course.create!(
        teacher: teacher,
        price: 1000,
        semester: 3
      )

    course2 =
      Course.create!(
        teacher: teacher,
        price: 1200,
        semester: 4
      )

    course3 =
      Course.create!(
        teacher: teacher,
        price: 1500,
        semester: 5
      )

    @user.save!

    Result.create!(
      user: @user,
      course: course1,
      gpa: 3.33,
      approved: true
    )

    Result.create!(
      user: @user,
      course: course2,
      gpa: 3.67,
      approved: true
    )

    Result.create!(
      user: @user,
      course: course3,
      gpa: 4.00,
      approved: false
    )

    assert_equal 3.5,
                 @user.cgpa
  end


  test "paid_for_course returns true when paid payment exists" do
    teacher =
      User.create!(
        email: "teacher_course_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    course =
      Course.create!(
        teacher: teacher,
        price: 1000,
        semester: 2
      )

    @user.save!

    Payment.create!(
      user: @user,
      course: course,
      status: "paid",
      amount: 1000,
      idempotency_key: SecureRandom.uuid
    )

    assert @user.paid_for_course?(course)
  end

  test "paid_for_course returns false when no paid payment exists" do
    teacher =
      User.create!(
        email: "teacher_course2_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    course =
      Course.create!(
        teacher: teacher,
        price: 1000,
        semester: 2
      )

    @user.save!

    Payment.create!(
      user: @user,
      course: course,
      status: "pending",
      amount: 1000,
      idempotency_key: SecureRandom.uuid
    )

    assert_not @user.paid_for_course?(course)
  end

  test "has many enrollments" do
    association =
      User.reflect_on_association(:enrollments)

    assert_equal :has_many,
                 association.macro
  end

  test "has many results" do
    association =
      User.reflect_on_association(:results)

    assert_equal :has_many,
                 association.macro
  end

  test "has many courses through enrollments" do
    association =
      User.reflect_on_association(:courses)

    assert_equal :has_many,
                 association.macro

    assert_equal :enrollments,
                 association.options[:through]
  end

  test "has many teaching courses" do
    association =
      User.reflect_on_association(:teaching_courses)

    assert_equal :has_many,
                 association.macro

    assert_equal "Course",
                 association.class_name
  end

  test "has many payments" do
    association =
      User.reflect_on_association(:payments)

    assert_equal :has_many,
                 association.macro
  end

  test "has many result exports dependent destroy" do
    association =
      User.reflect_on_association(:result_exports)

    assert_equal :has_many,
                 association.macro

    assert_equal :destroy,
                 association.options[:dependent]
  end

  test "has many created tests" do
    association =
      User.reflect_on_association(:created_tests)

    assert_equal :has_many,
                 association.macro

    assert_equal "Test",
                 association.class_name
  end

  test "has many test attempts dependent destroy" do
    association =
      User.reflect_on_association(:test_attempts)

    assert_equal :has_many,
                 association.macro

    assert_equal :destroy,
                 association.options[:dependent]
  end

  test "has many created coupons" do
    association =
      User.reflect_on_association(:created_coupons)

    assert_equal :has_many,
                 association.macro

    assert_equal "Coupon",
                 association.class_name
  end
end