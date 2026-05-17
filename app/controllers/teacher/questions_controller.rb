class Teacher::QuestionsController < ApplicationController
  before_action :authenticate_user!

  before_action :set_course
  before_action :set_test



  def index
    @questions = @test.questions.includes(:question_options)
  end

  def new
    @question = @test.questions.new
  end

  def create
    @question = @test.questions.new(question_params)

    if @question.save

      if @question.mcq?
        create_mcq_options
      end

      redirect_to teacher_course_test_questions_path(
                    @course,
                    @test
                  ),
                  notice: "Question created successfully"

    else
      render :new,
             status: :unprocessable_entity
    end
  end

  private

  def set_course
    @course = Course.find(params[:course_id])

    unless @course.teacher == current_user
      redirect_to root_path,
                  alert: "Unauthorized"
    end
  end

  def set_test
    @test = @course.tests.find(params[:test_id])
  end

  def question_params
    params.require(:question).permit(
      :content,
      :question_type,
      :marks,
      :correct_answer,
      :auto_check
    )
  end

  def create_mcq_options
    4.times do |i|

      @question.question_options.create(
        content: params[:options][i.to_s],
        correct:
          params[:correct_option] == i.to_s
      )

    end
  end
end