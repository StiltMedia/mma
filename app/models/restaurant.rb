class Restaurant < ActiveRecord::Base
  has_many :inventories
  has_many :specials
  has_many :recaps
end
