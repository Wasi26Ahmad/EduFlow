class User < ApplicationRecord
  has_many :enrollments
  has_many :results
  has_many :courses, foreign_key: :teacher_id, through: :enrollments
  has_many :teaching_courses, class_name: "Course", foreign_key: "teacher_id"
  has_many :payments

  has_many :created_tests,
           class_name: "Test",
           foreign_key: :teacher_id

  has_many :test_attempts,
           dependent: :destroy

  has_many :created_coupons,
           class_name: "Coupon",
           foreign_key: :created_by_id


  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable

  enum :role, {
    super_admin: 0,
    admin: 1,
    teacher: 2,
    student: 3
  }, default: :student

  before_validation :set_default_role
  before_validation :set_approval_status

def set_approval_status
  self.approved = true if role != "student"
end

  def set_default_role
    self.role ||= :student
  end
  validates :role, presence: true
  def admin_or_higher?
  admin? || super_admin?
  end

  def cgpa
    approved_results = results.where(approved: true)

    return 0 if approved_results.empty?

    approved_results.average(:gpa).to_f.round(2)
  end

  def paid_for_course?(course)
    payments.exists?(course: course, status: "paid")
  end

end
