class CreateQuestions < ActiveRecord::Migration[7.1]
  def change
    create_table :questions do |t|
      t.references :test, null: false, foreign_key: true

      t.integer :question_type, null: false

      t.text :content, null: false

      t.float :marks, default: 1

      t.text :correct_answer

      t.timestamps
    end
  end
end