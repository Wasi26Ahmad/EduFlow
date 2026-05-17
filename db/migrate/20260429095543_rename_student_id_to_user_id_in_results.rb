class RenameStudentIdToUserIdInResults < ActiveRecord::Migration[7.1]
  def change
    remove_column :results, :student_id, :integer
  end
end
