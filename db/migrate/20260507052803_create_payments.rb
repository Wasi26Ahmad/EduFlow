class CreatePayments < ActiveRecord::Migration[7.1]
  def change
    create_table :payments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true

      t.decimal :amount,
                precision: 10,
                scale: 2

      t.string :status, default: "pending"
      t.string :transaction_id
      t.string :gateway, default: "sslcommerz"

      t.datetime :paid_at

      t.timestamps
    end
  end
end
