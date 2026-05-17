class Coupon < ApplicationRecord
  belongs_to :course
  belongs_to :created_by, class_name: "User"
  before_save :normalize_code

  enum discount_type: {
    percentage: 0,
    fixed: 1
  }

  validates :code, presence: true, uniqueness: true
  validates :discount_value, presence: true

  before_validation :format_code

  def expired?
    expires_at.present? && expires_at < Time.current
  end

  def active_now?
    active && !expired?
  end

  private

  def format_code
    self.code = code.to_s.upcase.strip
  end

  def normalize_code
    self.code = code.upcase.strip
    end
end