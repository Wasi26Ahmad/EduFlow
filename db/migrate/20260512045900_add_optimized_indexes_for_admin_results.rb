class AddOptimizedIndexesForAdminResults < ActiveRecord::Migration[7.1]
  def change
    add_index :results, :approved,
              where: "(approved = false OR approved IS NULL)",
              name: "idx_results_unapproved"

    add_index :bulk_marks_uploads, [:status, :created_at],
              name: "idx_bulk_uploads_status_created"
  end
end