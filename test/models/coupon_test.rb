require "test_helper"

class CouponTest < ActiveSupport::TestCase
  def setup
    @teacher =
      User.new(
        email: "teacher_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    @course =
      Course.new(
        teacher: @teacher,
        price: 1000,
        semester: 3
      )

    @coupon =
      Coupon.new(
        course: @course,
        created_by: @teacher,
        code: " save10 ",
        discount_type: :percentage,
        discount_value: 10,
        active: true,
        expires_at: 1.day.from_now
      )
  end


  test "valid coupon" do
    assert @coupon.valid?
  end

  test "code must be present" do
    @coupon.code = nil

    assert_not @coupon.valid?
    assert_includes @coupon.errors[:code],
                    "can't be blank"
  end

  test "discount_value must be present" do
    @coupon.discount_value = nil

    assert_not @coupon.valid?
    assert_includes @coupon.errors[:discount_value],
                    "can't be blank"
  end


  test "belongs to course" do
    association =
      Coupon.reflect_on_association(:course)

    assert_equal :belongs_to,
                 association.macro
  end

  test "belongs to created_by" do
    association =
      Coupon.reflect_on_association(:created_by)

    assert_equal :belongs_to,
                 association.macro

    assert_equal "User",
                 association.class_name
  end


  test "discount_type enum values are correct" do
    expected_types = {
      "percentage" => 0,
      "fixed" => 1
    }

    assert_equal expected_types,
                 Coupon.discount_types
  end

  test "can set discount type to percentage" do
    @coupon.discount_type = :percentage

    assert @coupon.percentage?
  end

  test "can set discount type to fixed" do
    @coupon.discount_type = :fixed

    assert @coupon.fixed?
  end


  test "expired? returns true when expires_at is in the past" do
    @coupon.expires_at = 1.day.ago

    assert @coupon.expired?
  end

  test "expired? returns false when expires_at is in the future" do
    @coupon.expires_at = 1.day.from_now

    assert_not @coupon.expired?
  end

  test "expired? returns false when expires_at is nil" do
    @coupon.expires_at = nil

    assert_not @coupon.expired?
  end

  test "active_now? returns true when active and not expired" do
    @coupon.active = true
    @coupon.expires_at = 1.day.from_now

    assert @coupon.active_now?
  end

  test "active_now? returns false when inactive" do
    @coupon.active = false
    @coupon.expires_at = 1.day.from_now

    assert_not @coupon.active_now?
  end

  test "active_now? returns false when expired" do
    @coupon.active = true
    @coupon.expires_at = 1.day.ago

    assert_not @coupon.active_now?
  end


  test "format_code uppercases and strips code before validation" do
    @coupon.valid?

    assert_equal "SAVE10",
                 @coupon.code
  end

  test "normalize_code uppercases and strips code before save" do
    @coupon.code = " discount50 "

    @coupon.save(validate: false)

    assert_equal "DISCOUNT50",
                 @coupon.code
  end
end