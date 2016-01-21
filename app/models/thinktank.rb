class Thinktank < ActiveRecord::Base
  belongs_to :user
  has_many :ttcomments
end
