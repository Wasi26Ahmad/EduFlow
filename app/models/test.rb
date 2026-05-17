class Test < ApplicationRecord
  belongs_to :course

  belongs_to :teacher,
             class_name: "User"

  has_many :questions,
           dependent: :destroy

  has_many :test_attempts,
           dependent: :destroy

  validates :title, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :duration_minutes, presence: true
end
