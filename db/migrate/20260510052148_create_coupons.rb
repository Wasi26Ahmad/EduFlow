class CreateCoupons < ActiveRecord::Migration[7.1]
  def change
    create_table :coupons do |t|
      t.string :code, null: false
      t.integer :discount_type, default: 0
      t.decimal :discount_value, precision: 10, scale: 2

      t.decimal :max_discount, precision: 10, scale: 2
      t.decimal :minimum_purchase, precision: 10, scale: 2

      t.integer :usage_limit
      t.integer :used_count, default: 0

      t.datetime :starts_at
      t.datetime :expires_at

      t.boolean :active, default: true

      t.references :created_by, null: false, foreign_key: { to_table: :users }
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end

    add_index :coupons, :code, unique: true
  end
end