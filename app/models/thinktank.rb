class Thinktank < ActiveRecord::Base
  belongs_to :user
  has_many :ttcomments, :dependent => :delete_all
end
