require "test_helper"

class PaymentTest < ActiveSupport::TestCase
  def setup
    @teacher =
      User.new(
        email: "teacher_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    @student =
      User.new(
        email: "student_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :student
      )

    @course =
      Course.new(
        teacher: @teacher,
        price: 1000,
        semester: 3
      )

    @payment =
      Payment.new(
        user: @student,
        course: @course,
        amount: 1000,
        discount_amount: 0,
        idempotency_key: SecureRandom.uuid,
        status: :pending
      )
  end


  test "valid payment" do
    assert @payment.valid?
  end

  test "amount must be greater than 0" do
    @payment.amount = 0

    assert_not @payment.valid?
    assert_includes @payment.errors[:amount],
                    "must be greater than 0"
  end

  test "idempotency_key must be present" do
    @payment.idempotency_key = nil

    assert_not @payment.valid?
    assert_includes @payment.errors[:idempotency_key],
                    "can't be blank"
  end

  test "belongs to user" do
    association =
      Payment.reflect_on_association(:user)

    assert_equal :belongs_to,
                 association.macro
  end

  test "belongs to course" do
    association =
      Payment.reflect_on_association(:course)

    assert_equal :belongs_to,
                 association.macro
  end

  test "status enum values are correct" do
    expected_statuses = {
      "pending" => "pending",
      "paid" => "paid",
      "failed" => "failed",
      "cancelled" => "cancelled"
    }

    assert_equal expected_statuses,
                 Payment.statuses
  end

  test "can set status to pending" do
    @payment.status = :pending

    assert @payment.pending?
  end

  test "can set status to paid" do
    @payment.status = :paid

    assert @payment.paid?
  end

  test "can set status to failed" do
    @payment.status = :failed

    assert @payment.failed?
  end

  test "can set status to cancelled" do
    @payment.status = :cancelled

    assert @payment.cancelled?
  end


  test "paid? returns true when status is paid" do
    @payment.status = :paid

    assert @payment.paid?
  end

  test "paid? returns false when status is pending" do
    @payment.status = :pending

    assert_not @payment.paid?
  end

  test "original_amount returns amount plus discount amount" do
    @payment.amount = 800
    @payment.discount_amount = 200

    assert_equal 1000,
                 @payment.original_amount
  end

  test "discounted? returns true when discount amount is greater than 0" do
    @payment.discount_amount = 100

    assert @payment.discounted?
  end

  test "discounted? returns false when discount amount is 0" do
    @payment.discount_amount = 0

    assert_not @payment.discounted?
  end


  test "paid scope exists" do
    assert_respond_to Payment,
                      :paid
  end
end