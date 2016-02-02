class Restaurant < ActiveRecord::Base
  has_many :specials
  has_many :recaps

  def inventory_filled?(the_date)
    rand(0..1)==1 ? true : false    
  end
end
