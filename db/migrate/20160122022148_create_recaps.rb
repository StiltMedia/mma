class CreateRecaps < ActiveRecord::Migration
  def change
    create_table :recaps do |t|
      t.text :recap
      t.references :user, index: true, foreign_key: true
      t.references :restaurant, index: true, foreign_key: true
      t.timestamp :rdate

      t.timestamps null: false
    end
  end

  def data
    #start_date = Time.parse("2015-06-01T00:00:00-05:00")
    #(365*1).times do |i|
    #  if (rand(0..3)>0)
    #    Recap.create!(
    #      recap: Faker::Hipster.paragraphs(rand(1..3)).join(" "),
    #      user_id: User.all.sample(1)[0].id,
    #      restaurant_id: Restaurant.all.sample(1)[0].id,
    #      rdate: start_date+i.days
    #    )
    #  end
    #end
  end
end
