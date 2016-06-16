class AddImageToSpecials < ActiveRecord::Migration
  def change
    add_column :specials, :image, :string
  end
end
