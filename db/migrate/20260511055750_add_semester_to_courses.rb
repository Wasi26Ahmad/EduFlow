class AddSemesterToCourses < ActiveRecord::Migration[7.1]
  def change
    add_column :courses, :semester, :integer, null: false, default: 1
  end
end