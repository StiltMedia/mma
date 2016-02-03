class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.timestamps null: false
    end
  end

  def data
    100.times do
      Product.create(
        name: Faker::Commerce.product_name
      )
    end
  end
end
