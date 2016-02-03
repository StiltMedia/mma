class RemoveRestaurantIdFromInventoryCheck < ActiveRecord::Migration
  def change
    remove_column :inventory_checks, :restaurant_id
  end
end
