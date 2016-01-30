class AddMimetypeToUser < ActiveRecord::Migration
  def change
    add_column :users, :mimetype, :string
  end
end
