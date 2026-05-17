class TestAttempt < ApplicationRecord
  belongs_to :user

  belongs_to :test

  has_many :answers,
           dependent: :destroy

  enum status: {
    in_progress: 0,
    submitted: 1,
    auto_submitted: 2,
    evaluated: 3
  }
end