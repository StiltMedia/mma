class RestaurantProduct < ActiveRecord::Base
  belongs_to :restaurant
  belongs_to :product
end
