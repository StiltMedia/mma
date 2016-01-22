class Rcomment < ActiveRecord::Base
  belongs_to :user
  belongs_to :recap
end
