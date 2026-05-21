require "test_helper"

class CoursesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @student = User.create!(
      email: "student@example.com",
      password: "password123",
      role: "student"
    )

    @teacher = User.create!(
      email: "teacher@example.com",
      password: "password123",
      role: "teacher"
    )

    @admin = User.create!(
      email: "admin@example.com",
      password: "password123",
      role: "admin"
    )

    @course = Course.create!(
      title: "Math",
      code: "MTH101",
      teacher: @teacher,
      price: 1000,
      semester: 1
    )
  end

  test "guest gets redirected to sign in" do
    get courses_path

    assert_redirected_to new_user_session_path
  end

  test "student gets redirected from index" do
    sign_in @student

    get courses_path

    assert_redirected_to new_user_session_path
  end

  test "student cannot edit course" do
    sign_in @student

    get edit_course_path(@course)

    assert_response :redirect
  end

  test "teacher can edit course" do
    sign_in @teacher

    get edit_course_path(@course)

    assert_response :success
  end

  test "student cannot update course" do
    sign_in @student

    patch course_path(@course), params: {
      course: {
        title: "Updated Title"
      }
    }

    assert_response :redirect

    @course.reload
    assert_not_equal "Updated Title", @course.title
  end

  test "teacher can update course" do
    sign_in @teacher

    patch course_path(@course), params: {
      course: {
        title: "Updated Title"
      }
    }

    assert_redirected_to courses_path

    @course.reload
    assert_equal "Updated Title", @course.title
  end
end