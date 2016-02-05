class SeedInventoryChecks < ActiveRecord::Migration
  def change
  end

  def data
    # NOSEEDS RestaurantProduct.all.each do |rp|
    # NOSEEDS   start_date = Time.parse("2015-06-01T00:00:00-05:00")
    # NOSEEDS   the_date = start_date
    # NOSEEDS   (365*1).times do
    # NOSEEDS     if ( rand(1..3)==1 )
    # NOSEEDS       InventoryCheck.create(
    # NOSEEDS         restaurant_product_id: rp.id,
    # NOSEEDS         quantity: rand(0..100),
    # NOSEEDS         idate: the_date
    # NOSEEDS       )
    # NOSEEDS     end
    # NOSEEDS     the_date = the_date + 1.day
    # NOSEEDS   end
    # NOSEEDS end
    # NOSEEDS 
    # NOSEEDS # remove all inventorychecks for some random days
    # NOSEEDS start_date = Time.parse("2015-06-01T00:00:00-05:00")
    # NOSEEDS the_date = start_date
    # NOSEEDS (365*1).times do
    # NOSEEDS   range_start = the_date.midnight
    # NOSEEDS   range_end = (the_date+1.day).midnight
    # NOSEEDS   if (rand(1..2)==1)
    # NOSEEDS     puts "About to negate #{InventoryCheck.where(idate: range_start..range_end).all.size} items"
    # NOSEEDS     InventoryCheck.where(idate: range_start..range_end).update_all(quantity: -1)
    # NOSEEDS   end
    # NOSEEDS   the_date = the_date + 1.day
    # NOSEEDS end
    
  end

end
