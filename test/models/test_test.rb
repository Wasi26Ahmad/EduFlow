require "test_helper"

class TestTest < ActiveSupport::TestCase
  def setup
    @teacher =
      User.create!(
        email: "teacher_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    @course =
      Course.create!(
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
  end

  test "valid test" do
    assert @test_model.valid?
  end

  test "title must be present" do
    @test_model.title = nil

    assert_not @test_model.valid?
    assert_includes @test_model.errors[:title],
                    "can't be blank"
  end

  test "start_time must be present" do
    @test_model.start_time = nil

    assert_not @test_model.valid?
    assert_includes @test_model.errors[:start_time],
                    "can't be blank"
  end

  test "end_time must be present" do
    @test_model.end_time = nil

    assert_not @test_model.valid?
    assert_includes @test_model.errors[:end_time],
                    "can't be blank"
  end

  test "duration_minutes must be present" do
    @test_model.duration_minutes = nil

    assert_not @test_model.valid?
    assert_includes @test_model.errors[:duration_minutes],
                    "can't be blank"
  end


  test "belongs to course" do
    association =
      Test.reflect_on_association(:course)

    assert_equal :belongs_to,
                 association.macro
  end

  test "belongs to teacher" do
    association =
      Test.reflect_on_association(:teacher)

    assert_equal :belongs_to,
                 association.macro

    assert_equal "User",
                 association.class_name
  end

  test "has many questions dependent destroy" do
    association =
      Test.reflect_on_association(:questions)

    assert_equal :has_many,
                 association.macro

    assert_equal :destroy,
                 association.options[:dependent]
  end

  test "has many test attempts dependent destroy" do
    association =
      Test.reflect_on_association(:test_attempts)

    assert_equal :has_many,
                 association.macro

    assert_equal :destroy,
                 association.options[:dependent]
  end
end