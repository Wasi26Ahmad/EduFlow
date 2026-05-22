require "test_helper"

class AnswerTest < ActiveSupport::TestCase
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

    @test_model =
      Test.new(
        title: "Final Exam",
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

    @question =
      Question.new(
        test: @test_model,
        content: "What is Rails?",
        question_type: :mcq
      )

    @selected_option =
      QuestionOption.new(
        question: @question
      )

    @answer =
      Answer.new(
        test_attempt: @test_attempt,
        question: @question,
        selected_option: @selected_option
      )
  end

  test "valid answer" do
    assert @answer.valid?
  end


  test "belongs to test_attempt" do
    association =
      Answer.reflect_on_association(:test_attempt)

    assert_equal :belongs_to,
                 association.macro
  end

  test "belongs to question" do
    association =
      Answer.reflect_on_association(:question)

    assert_equal :belongs_to,
                 association.macro
  end

  test "belongs to selected_option" do
    association =
      Answer.reflect_on_association(:selected_option)

    assert_equal :belongs_to,
                 association.macro

    assert_equal "QuestionOption",
                 association.class_name
  end

  test "selected_option is optional" do
    @answer.selected_option = nil

    assert @answer.valid?
  end
end