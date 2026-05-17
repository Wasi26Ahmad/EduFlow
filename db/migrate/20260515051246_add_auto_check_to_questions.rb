class AddAutoCheckToQuestions < ActiveRecord::Migration[7.1]
  def change
    add_column :questions,
               :auto_check,
               :boolean,
               default: true
  end
end