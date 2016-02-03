class AddRestaurantProductIdToInventoryCheck < ActiveRecord::Migration
  def change
    add_column :inventory_checks, :restaurant_product_id, :integer
  end
end
