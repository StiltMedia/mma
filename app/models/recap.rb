class Recap < ActiveRecord::Base
  belongs_to :user
  belongs_to :restaurant
  has_many :rcomments
end
