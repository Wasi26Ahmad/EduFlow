class Answer < ApplicationRecord
  belongs_to :test_attempt

  belongs_to :question

  belongs_to :selected_option,
             class_name: "QuestionOption",
             optional: true
end