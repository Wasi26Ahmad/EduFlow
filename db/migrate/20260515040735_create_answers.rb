class CreateAnswers < ActiveRecord::Migration[7.1]
  def change
    create_table :answers do |t|
      t.references :test_attempt,
                   null: false,
                   foreign_key: true

      t.references :question,
                   null: false,
                   foreign_key: true

      t.bigint :selected_option_id

      t.text :text_answer

      t.float :obtained_marks, default: 0

      t.boolean :correct, default: false

      t.timestamps
    end

    add_foreign_key :answers,
                    :question_options,
                    column: :selected_option_id
  end
end