class AddCouponFieldsToPayments < ActiveRecord::Migration[7.1]
  def change
    add_column :payments, :discount_amount, :decimal
    add_column :payments, :coupon_code, :string
  end
end
