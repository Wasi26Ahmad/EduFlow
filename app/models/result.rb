# app/models/result.rb

class Result < ApplicationRecord
  belongs_to :user
  belongs_to :course

  validates :user_id, uniqueness: { scope: :course_id }

  validates :marks,
            numericality: {
              greater_than_or_equal_to: 0,
              less_than_or_equal_to: 100
            },
            allow_nil: true

  before_save :calculate_gpa

  before_validation :set_semester

  def set_semester
    self.semester ||= course.semester
  end

  scope :approved_results, -> { where(approved: true) }

  private

  def calculate_gpa
    return if marks.nil?

    self.gpa =
      case marks
      when 80..100
        4.0
      when 75...80
        3.75
      when 70...75
        3.5
      when 65...70
        3.25
      when 60...65
        3.0
      when 55...60
        2.75
      when 50...55
        2.5
      when 45...50
        2.25
      when 40...45
        2.0
      else
        0.0
      end
  end
end