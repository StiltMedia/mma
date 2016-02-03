class SeedInventoryChecks < ActiveRecord::Migration
  def change
  end

  def data
    RestaurantProduct.all.each do |rp|
      start_date = Time.parse("2015-01-01T00:00:00-05:00")
      the_date = start_date
      (365*2).times do
        if ( rand(1..3)==1 )
          InventoryCheck.create(
            restaurant_product_id: rp.id,
            quantity: rand(0..100),
            idate: the_date
          )
        end
        the_date = the_date + 1.day
      end
    end

    # remove all inventorychecks for some random days
    start_date = Time.parse("2015-01-01T00:00:00-05:00")
    the_date = start_date
    (365*2).times do
      range_start = the_date.midnight
      range_end = (the_date+1.day).midnight
      if (rand(1..2)==1)
        puts "About to negate #{InventoryCheck.where(idate: range_start..range_end).all.size} items"
        InventoryCheck.where(idate: range_start..range_end).update_all(quantity: -1)
      end
      the_date = the_date + 1.day
    end
    
  end

end
