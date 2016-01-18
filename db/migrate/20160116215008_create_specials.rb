class CreateSpecials < ActiveRecord::Migration
  def change
    create_table :specials do |t|
      t.string :name
      t.text :description
      t.string :photo
      t.references :restaurant, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
