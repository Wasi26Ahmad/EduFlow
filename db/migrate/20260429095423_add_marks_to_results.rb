class AddMarksToResults < ActiveRecord::Migration[7.1]
  def change
    add_column :results, :marks, :float
  end
end
