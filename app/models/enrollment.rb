class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course
  validates :course_id, uniqueness: { scope: :user_id }

  before_validation :set_semester

  def set_semester
    self.semester ||= course.semester
  end

  enum :status, {
    pending: 0,
    approved: 1
  }, default: :pending
end
