class AddSemesterToEnrollments < ActiveRecord::Migration[7.1]
  def change
    add_column :enrollments, :semester, :integer
  end
end