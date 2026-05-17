class AddApprovedToResults < ActiveRecord::Migration[7.1]
  def change
    add_column :results, :approved, :boolean, default: false
  end
end
