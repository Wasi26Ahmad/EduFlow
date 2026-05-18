class TestAttemptsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_attempt

  def show
    if Time.current > @attempt.expires_at &&
       @attempt.in_progress?

      auto_submit

      redirect_to ct_marks_path,
                  alert: "Time expired."

      return
    end
  end

  def update
    if Time.current > @attempt.expires_at

      auto_submit

      redirect_to ct_marks_path,
                  alert: "Time expired."

      return
    end

    if @attempt.submitted? ||
       @attempt.auto_submitted? ||
       @attempt.evaluated?

      redirect_to ct_marks_path,
                  alert: "Already submitted."

      return
    end

    total_obtained = 0.0

    @attempt.test.questions.each do |question|

      answer_value =
        params[:answers]&.[](question.id.to_s)

      if question.auto_check?

        if question.mcq?

          selected_option =
            QuestionOption.find_by(
              id: answer_value
            )

          correct =
            selected_option&.correct || false

          obtained =
            correct ? question.marks.to_f : 0.0

          total_obtained += obtained

          @attempt.answers.create!(
            question: question,
            selected_option: selected_option,
            correct: correct,
            obtained_marks: obtained
          )

        else

          text_answer =
            answer_value.to_s.strip

          correct =
            text_answer.downcase ==
            question.correct_answer
                    .to_s
                    .strip
                    .downcase

          obtained =
            correct ? question.marks.to_f : 0.0

          total_obtained += obtained

          @attempt.answers.create!(
            question: question,
            text_answer: text_answer,
            correct: correct,
            obtained_marks: obtained
          )

        end

      else

        if question.mcq?

          selected_option =
            QuestionOption.find_by(
              id: answer_value
            )

          @attempt.answers.create!(
            question: question,
            selected_option: selected_option
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
      if @attempt.test.total_marks.to_f > 0

        (
          total_obtained /
            @attempt.test.total_marks.to_f
        ) * 100

      else

        0.0

      end

    @attempt.update!(
      submitted_at: Time.current,
      total_marks_obtained: total_obtained,
      percentage: percentage,
      status: :submitted
    )

    redirect_to ct_marks_path,
                notice: "Test submitted successfully."
  end

  private

  def set_attempt
    @attempt =
      current_user.test_attempts.find(
        params[:id]
      )
  end

  def auto_submit
    @attempt.update!(
      submitted_at: Time.current,
      status: :auto_submitted
    )
  end

  def evaluate

    total_marks = 0.0

    @attempt.answers.each do |answer|

      if answer.question.auto_check?

        total_marks += answer.obtained_marks.to_f

      else

        given_marks =
          params[:marks][answer.id.to_s].to_f

        max_marks =
          answer.question.marks.to_f

        if given_marks > max_marks
          given_marks = max_marks
        end

        if given_marks < 0
          given_marks = 0
        end

        answer.update!(
          obtained_marks: given_marks,
          correct: given_marks > 0
        )

        total_marks += given_marks

      end

    end

    percentage =
      if @attempt.test.total_marks.to_f > 0

        (
          total_marks /
            @attempt.test.total_marks.to_f
        ) * 100

      else

        0.0

      end

    @attempt.update!(
      total_marks_obtained: total_marks,
      percentage: percentage,
      status: :evaluated
    )

    redirect_to ct_marks_path,
                notice: "Attempt evaluated successfully."

  end
end