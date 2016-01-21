class Ttcomment < ActiveRecord::Base
  belongs_to :user
  belongs_to :thinktank
end
