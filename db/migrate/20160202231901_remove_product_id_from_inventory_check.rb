class RemoveProductIdFromInventoryCheck < ActiveRecord::Migration
  def change
    remove_column :inventory_checks, :product_id
  end
end
