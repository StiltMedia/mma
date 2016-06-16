class AddChefToUsers < ActiveRecord::Migration
  def change
    add_column :users, :chef, :boolean, null: false, default: false
  end
end
