class Special < ActiveRecord::Base
  belongs_to :restaurant
  mount_uploader :image, ImageUploader

  default_scope { order(:created_at => :asc) }
end
