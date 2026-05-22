require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
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

    @question =
      Question.new(
        test: @test_model,
        content: "What is Ruby on Rails?",
        question_type: :mcq
      )
  end

  test "valid question" do
    assert @question.valid?
  end

  test "content must be present" do
    @question.content = nil

    assert_not @question.valid?
    assert_includes @question.errors[:content],
                    "can't be blank"
  end


  test "belongs to test" do
    association =
      Question.reflect_on_association(:test)

    assert_equal :belongs_to,
                 association.macro
  end

  test "has many question options dependent destroy" do
    association =
      Question.reflect_on_association(:question_options)

    assert_equal :has_many,
                 association.macro

    assert_equal :destroy,
                 association.options[:dependent]
  end

  test "has many answers dependent destroy" do
    association =
      Question.reflect_on_association(:answers)

    assert_equal :has_many,
                 association.macro

    assert_equal :destroy,
                 association.options[:dependent]
  end


  test "question type enum values are correct" do
    expected_types = {
      "mcq" => 0,
      "short" => 1
    }

    assert_equal expected_types,
                 Question.question_types
  end

  test "can set question type to mcq" do
    @question.question_type = :mcq

    assert @question.mcq?
  end

  test "can set question type to short" do
    @question.question_type = :short

    assert @question.short?
  end
end