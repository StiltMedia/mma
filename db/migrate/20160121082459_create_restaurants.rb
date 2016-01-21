class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name

      t.timestamps null: false
    end
  end

  def data
    Restaurant.create!(name: "Miami Beach")
    Restaurant.create!(name: "San Juan")
    Restaurant.create!(name: "Palm Beach")
  end
end
