class CreateStudents < ActiveRecord::Migration[7.1]
  def change
    create_table :students do |t|
      t.references :user, null: false, foreign_key: true
      t.string :student_id
      t.string :address
      t.string :gender
      t.integer :current_semester

      t.timestamps
    end
  end
end
