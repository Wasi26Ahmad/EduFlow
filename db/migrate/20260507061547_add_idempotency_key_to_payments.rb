class AddIdempotencyKeyToPayments < ActiveRecord::Migration[7.1]
  def change
    add_column :payments, :idempotency_key, :string
    add_index :payments, :idempotency_key, unique: true, name: "index_payments_on_idempotency_key"
  end
end
