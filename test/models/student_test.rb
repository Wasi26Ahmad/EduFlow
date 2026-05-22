require "test_helper"

class StudentTest < ActiveSupport::TestCase
  def setup
    @user =
      User.new(
        email: "student_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :student
      )

    @student =
      Student.new(
        user: @user
      )
  end



  test "valid student" do
    assert @student.valid?
  end

  test "belongs to user" do
    association =
      Student.reflect_on_association(:user)

    assert_equal :belongs_to,
                 association.macro
  end

  test "has many results" do
    association =
      Student.reflect_on_association(:results)

    assert_equal :has_many,
                 association.macro
  end
end