class CreateResultExports < ActiveRecord::Migration[7.1]
  def change
    create_table :result_exports do |t|
      t.references :user,
                   null: false,
                   foreign_key: true

      t.string :status,
               default: "pending",
               null: false

      t.text :error

      t.timestamps
    end

    add_index :result_exports, :status
    add_index :result_exports, :created_at
  end
end