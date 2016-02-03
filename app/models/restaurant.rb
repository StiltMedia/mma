class Restaurant < ActiveRecord::Base
  has_many :specials
  has_many :recaps
  has_many :products, through: :restaurant_products
  has_many :restaurant_products

  # the_date should be in yyyy-mm-dd format
  def inventory_filled?(the_date)
    range_start = Time.zone.parse(the_date).midnight
    range_end = (Time.zone.parse(the_date)+1.day).midnight
    InventoryCheck.where(idate: range_start..range_end).all.size>0
  end
end
