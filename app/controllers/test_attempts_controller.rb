class TestAttemptsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_attempt

  def show
    if Time.current > @attempt.expires_at &&
       @attempt.in_progress?
      auto_submit
      redirect_to ct_marks_path,
                  alert: "Time expired"
      return
    end
  end

  def update

    if Time.current > @attempt.expires_at

      auto_submit

      redirect_to ct_marks_path,
                  alert: "Time has expired"

      return
    end

    if @attempt.submitted? ||
       @attempt.auto_submitted? ||
       @attempt.evaluated?

      redirect_to ct_marks_path,
                  alert: "You have already submitted"

      return
    end

    @attempt.answers.destroy_all

    total_obtained = 0.0

    test =
      @attempt.test

    questions =
      test.questions.includes(:question_options)
    questions.each do |question|

      answer_value =
        params[:answers]&.[](question.id.to_s)

      next if answer_value.blank?

      if question.auto_check?

        cached_answer =
          fetch_cached_answer(
            test,
            question
          )

        if question.mcq?

          correct =
            cached_answer.to_s ==
            answer_value.to_s

          obtained =
            correct ? question.marks.to_f : 0.0

          total_obtained += obtained

          @attempt.answers.create!(
            question: question,
            selected_option_id:
              answer_value,
            correct: correct,
            obtained_marks:
              obtained
          )

        else

          submitted_text =
            answer_value
              .to_s
              .strip
              .downcase
              .squish

          correct =
            submitted_text ==
            cached_answer
              .to_s
              .strip
              .downcase
              .squish

          obtained =
            correct ? question.marks.to_f : 0.0

          total_obtained += obtained

          @attempt.answers.create!(
            question: question,
            text_answer:
              answer_value,
            correct: correct,
            obtained_marks:
              obtained
          )

        end

      else

        if question.mcq?

          @attempt.answers.create!(
            question: question,
            selected_option_id: answer_value
          )

        else

          @attempt.answers.create!(
            question: question,
            text_answer: answer_value
          )

        end

      end

    end

    percentage =
      calculate_percentage(
        total_obtained,
        test.total_marks
      )

    @attempt.update!(
      submitted_at: Time.current,

      total_marks_obtained:
        total_obtained,

      percentage: percentage,

      status: :submitted
    )

    redirect_to ct_marks_path,
                notice: "Test submitted successfully"
  end

  private

  def set_attempt
    @attempt =
      current_user
        .test_attempts
        .includes(
          test: {
            questions: :question_options
          }
        )
        .find(params[:id])
  end

  def auto_submit
    @attempt.update!(
      submitted_at: Time.current,
      status: :auto_submitted
    )
  end

  def fetch_cached_answer(test, question)

    cached_answer =
      TestAnswerCacheService.correct_answer(
        test.id,
        question.id
      )

    return cached_answer if cached_answer.present?

    TestAnswerCacheService.load_answers(test)

    TestAnswerCacheService.correct_answer(
      test.id,
      question.id
    )
  end

  def calculate_percentage(
    obtained,
    total
  )

    return 0.0 if total.to_f <= 0

    (
      obtained.to_f /
        total.to_f
    ) * 100
  end

  def evaluate

    total_marks = 0.0

    @attempt.answers.each do |answer|

      if answer.question.auto_check?

        total_marks +=
          answer.obtained_marks.to_f

      else

        given_marks =
          params[:marks][answer.id.to_s].to_f

        max_marks =
          answer.question.marks.to_f

        given_marks =
          max_marks if given_marks > max_marks

        given_marks =
          0 if given_marks < 0

        answer.update!(
          obtained_marks: given_marks,
          correct: given_marks > 0
        )

        total_marks += given_marks

      end
    end

    percentage =
      calculate_percentage(
        total_marks,
        @attempt.test.total_marks
      )

    @attempt.update!(
      total_marks_obtained: total_marks,
      percentage: percentage,
      status: :evaluated
    )

    redirect_to ct_marks_path,
                notice: "Attempt evaluated successfully"
  end
end