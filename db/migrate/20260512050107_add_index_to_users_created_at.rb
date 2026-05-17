class AddIndexToUsersCreatedAt < ActiveRecord::Migration[7.1]
  def change
    add_index :users, :created_at
  end
end