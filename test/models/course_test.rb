# test/models/course_test.rb

require "test_helper"

class CourseTest < ActiveSupport::TestCase
  def setup
    @teacher =
      User.create!(
        email: "teacher@example.com",
        password: "password123"
      )

    @course =
      Course.new(
        teacher: @teacher,
        price: 1000,
        semester: 3
      )
  end


  test "valid course" do
    assert @course.valid?
  end

  test "price can be zero" do
    @course.price = 0

    assert @course.valid?
  end

  test "price cannot be negative" do
    @course.price = -10

    assert_not @course.valid?
    assert_includes @course.errors[:price],
                    "must be greater than or equal to 0"
  end

  test "semester within valid range is valid" do
    (1..8).each do |semester|
      @course.semester = semester

      assert @course.valid?,
             "Expected semester #{semester} to be valid"
    end
  end

  test "semester below range is invalid" do
    @course.semester = 0

    assert_not @course.valid?
    assert_includes @course.errors[:semester],
                    "is not included in the list"
  end

  test "semester above range is invalid" do
    @course.semester = 9

    assert_not @course.valid?
    assert_includes @course.errors[:semester],
                    "is not included in the list"
  end

  test "belongs to teacher" do
    association =
      Course.reflect_on_association(:teacher)

    assert_equal :belongs_to,
                 association.macro

    assert_equal "User",
                 association.class_name
  end

  test "has many enrollments" do
    association =
      Course.reflect_on_association(:enrollments)

    assert_equal :has_many,
                 association.macro
  end

  test "has many students through enrollments" do
    association =
      Course.reflect_on_association(:students)

    assert_equal :has_many,
                 association.macro

    assert_equal :enrollments,
                 association.options[:through]
  end

  test "has many tests dependent destroy" do
    association =
      Course.reflect_on_association(:tests)

    assert_equal :has_many,
                 association.macro

    assert_equal :destroy,
                 association.options[:dependent]
  end

  test "has many coupons dependent destroy" do
    association =
      Course.reflect_on_association(:coupons)

    assert_equal :has_many,
                 association.macro

    assert_equal :destroy,
                 association.options[:dependent]
  end
end