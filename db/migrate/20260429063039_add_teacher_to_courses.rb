class AddTeacherToCourses < ActiveRecord::Migration[7.1]
  def change
    add_column :courses, :teacher_id, :bigint, null: true
    add_foreign_key :courses, :users, column: :teacher_id
  end
end
