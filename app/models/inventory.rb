class Inventory < ActiveRecord::Base
  belongs_to :product
  belongs_to :restaurant
end
