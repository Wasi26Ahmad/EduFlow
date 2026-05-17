class CreateTests < ActiveRecord::Migration[7.1]
  def change
    create_table :tests do |t|
      t.references :course, null: false, foreign_key: true

      t.references :teacher,
                   null: false,
                   foreign_key: { to_table: :users }

      t.string :title, null: false
      t.text :description

      t.datetime :start_time, null: false
      t.datetime :end_time, null: false

      t.integer :duration_minutes, null: false

      t.float :total_marks, default: 0

      t.boolean :published, default: false

      t.integer :semester, null: false

      t.timestamps
    end

    add_index :tests, :start_time
    add_index :tests, :end_time
    add_index :tests, :semester
  end
end