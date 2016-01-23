class DataWork < ActiveRecord::Migration
  def change
    puts "DB8 #{User.inspect}"
  end
end
