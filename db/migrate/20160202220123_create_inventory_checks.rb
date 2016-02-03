class CreateInventoryChecks < ActiveRecord::Migration
  def change
    create_table :inventory_checks do |t|
      t.integer :quantity
      t.timestamp :idate
      t.references :restaurant, index: true, foreign_key: true
      t.references :product, index: true, foreign_key: true

      t.timestamps null: false
    end
  end

end
