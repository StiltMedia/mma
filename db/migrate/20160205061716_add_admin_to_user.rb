class AddAdminToUser < ActiveRecord::Migration
  def change
    add_column :users, :admin, :boolean
  end

  def data
    User.find_by_email("sean@example.net").update_attribute(:admin, true)
  end
end
