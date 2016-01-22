class Restaurant < ActiveRecord::Base
  has_many :inventories
  has_many :specials
end
