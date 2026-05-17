class Question < ApplicationRecord
  belongs_to :test

  has_many :question_options,
           dependent: :destroy

  has_many :answers,
           dependent: :destroy

  enum question_type: {
    mcq: 0,
    short: 1
  }

  validates :content, presence: true
end