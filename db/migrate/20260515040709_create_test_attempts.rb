class CreateTestAttempts < ActiveRecord::Migration[7.1]
  def change
    create_table :test_attempts do |t|
      t.references :user, null: false, foreign_key: true

      t.references :test, null: false, foreign_key: true

      t.datetime :started_at

      t.datetime :submitted_at

      t.datetime :expires_at

      t.float :total_marks_obtained, default: 0

      t.float :percentage, default: 0

      t.integer :status, default: 0

      t.timestamps
    end

    add_index :test_attempts,
              [:user_id, :test_id],
              unique: true
  end
end