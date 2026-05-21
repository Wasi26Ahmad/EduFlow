class AddConstraintsToPayments < ActiveRecord::Migration[7.1]
  def change
    change_column_null :payments,
                       :idempotency_key,
                       false

    unless index_exists?(:payments, :idempotency_key, unique: true)
      add_index :payments,
                :idempotency_key,
                unique: true
    end
  end
end