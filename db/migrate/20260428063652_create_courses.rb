class CreateCourses < ActiveRecord::Migration[7.1]
  def change
    create_table :courses do |t|
      t.string :course_code
      t.string :title

      t.timestamps
    end
  end
end
