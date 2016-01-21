class AddPictureToUser < ActiveRecord::Migration
  def change
    add_column :users, :picture, :binary
  end

  def data
    #a = User.all.first
    #a.picture = open('app/assets/images/chef-1.jpg', 'rb') { |f| f.read }
    #a.save
  end
end
