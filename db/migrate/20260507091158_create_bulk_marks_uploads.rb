class CreateBulkMarksUploads < ActiveRecord::Migration[7.1]
  def change
    create_table :bulk_marks_uploads do |t|
      t.references :teacher, null: false, foreign_key: { to_table: :users }

      t.references :course, null: false, foreign_key: true

      t.string :status, default: "pending"
      t.text :rejection_reason

      t.timestamps
    end
  end
end