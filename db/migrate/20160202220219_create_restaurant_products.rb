class CreateRestaurantProducts < ActiveRecord::Migration
  def change
    create_table :restaurant_products do |t|
      t.references :restaurant, index: true, foreign_key: true
      t.references :product, index: true, foreign_key: true
      t.timestamps null: false
    end
  end

  def data
    # NOSEEDS Restaurant.all.each do |r|
    # NOSEEDS   Product.all.sample( rand(3..20)).each do |p|
    # NOSEEDS     r.products << p
    # NOSEEDS   end
    # NOSEEDS end
  end
end
