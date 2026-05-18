class AddFinalizedToTests < ActiveRecord::Migration[7.1]
  def change
    add_column :tests, :finalized, :boolean, default: false
  end
end