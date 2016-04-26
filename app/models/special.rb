class Special < ActiveRecord::Base
  belongs_to :restaurant
  mount_uploader :image, ImageUploader
end
