class AddFilePathToResultExports < ActiveRecord::Migration[7.1]
  def change
    add_column :result_exports, :file_path, :string
  end
end
