require "test_helper"

class QuestionOptionTest < ActiveSupport::TestCase
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
        title: "Final Exam",
        course: @course,
        teacher: @teacher,
        start_time: 1.hour.from_now,
        end_time: 2.hours.from_now,
        duration_minutes: 60
      )

    @question =
      Question.new(
        test: @test_model,
        content: "What is Rails?",
        question_type: :mcq
      )

    @question_option =
      QuestionOption.new(
        question: @question
      )
  end


  test "valid question option" do
    assert @question_option.valid?
  end


  test "belongs to question" do
    association =
      QuestionOption.reflect_on_association(:question)

    assert_equal :belongs_to,
                 association.macro
  end
end