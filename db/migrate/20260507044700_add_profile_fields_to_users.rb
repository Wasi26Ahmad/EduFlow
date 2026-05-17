class AddProfileFieldsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :student_id, :string
    add_column :users, :phone, :string
    add_column :users, :address, :string
    add_column :users, :gender, :string
    add_column :users, :date_of_birth, :date
    add_column :users, :current_semester, :integer
    add_column :users, :bio, :text
  end
end
