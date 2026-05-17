class Course < ApplicationRecord
  has_many :enrollments
  belongs_to :teacher, class_name: "User"
  has_many :students, through: :enrollments, source: :user
  has_many :payments
  has_many :results

  has_many :tests,
           dependent: :destroy

  has_many :coupons, dependent: :destroy

  validates :price,
            numericality: {
              greater_than_or_equal_to: 0
            }

  validates :semester,
            inclusion: { in: 1..8 }
  
end

