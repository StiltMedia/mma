class AddPictureb64ToUsers < ActiveRecord::Migration
  def change
    add_column :users, :pictureb64, :text
  end
end
