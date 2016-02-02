class AddIdateToInventory < ActiveRecord::Migration
  def change
    add_column :inventories, :idate, :timestamp
  end

  def data
    100.times do
      Inventory.create!(
        restaurant_id: Restaurant.all.sample(1)[0].id,
        quantity: rand(0..100),
        product: Faker::SlackEmoji.food_and_drink.gsub(/:/,'').titlecase,
        idate: Time.now()
      )
    end
  end
end
