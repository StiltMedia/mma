class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.timestamps null: false
    end
  end

  def data
    # NOSEEDS 100.times do
    # NOSEEDS   Product.create(
    # NOSEEDS     name: Faker::Commerce.product_name
    # NOSEEDS   )
    # NOSEEDS end
  end
end
