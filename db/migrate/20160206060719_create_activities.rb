class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :activity
      t.string :ip
      t.string :geo_location
      t.string :browser_os
      t.text :details
      t.timestamp :atime
      t.string :username

      t.timestamps null: false
    end
  end

  def data
    Activity.create( activity: "The activity",
                     ip: "123.23.123.12",
                     geo_location: "Miami, FL",
                     browser_os: "Mozilla/5.0 (X11; Linux i686 on x86_64; rv:10.0) Gecko/20100101 Firefox/10.0",
                     details: nil,
                     atime: Time.now(),
                     username: nil)
  end
end
