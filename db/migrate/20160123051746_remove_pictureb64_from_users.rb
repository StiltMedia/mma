class RemovePictureb64FromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :pictureb64, :text
  end
end
