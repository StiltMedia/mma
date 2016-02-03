class CreateRestaurantProducts < ActiveRecord::Migration
  def change
    create_table :restaurant_products do |t|
      t.references :restaurant, index: true, foreign_key: true
      t.references :product, index: true, foreign_key: true
      t.timestamps null: false
    end
  end

  def data
    Restaurant.all.each do |r|
      Product.all.sample( rand(3..20)).each do |p|
        r.products << p
      end
    end
  end
end
