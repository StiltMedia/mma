class CreateInventories < ActiveRecord::Migration
  def change
    create_table :inventories do |t|
      t.references :restaurant, index: true, foreign_key: true
      t.integer :quantity
      t.string :product

      t.timestamps null: false
    end
  end

  def data
    100.times do
      Inventory.create!(
        restaurant_id: Restaurant.all.sample(1)[0].id,  
        quantity: rand(0..100),
        product: Faker::SlackEmoji.food_and_drink.gsub(/:/,'').titlecase
      )
    end
  end
end
