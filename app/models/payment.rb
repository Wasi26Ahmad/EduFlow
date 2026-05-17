class Payment < ApplicationRecord
  belongs_to :user
  belongs_to :course

  validates :amount,
            numericality: {
              greater_than: 0
            }

  validates :idempotency_key, uniqueness: true

  enum :status, {
    pending: "pending",
    paid: "paid",
    failed: "failed",
    cancelled: "cancelled"
  }

  scope :paid, -> { where(status: "paid") }

  def paid?
    status == "paid"
  end

  def original_amount
    amount.to_f + discount_amount.to_f
  end

  def discounted?
    discount_amount.to_f > 0
  end
end
