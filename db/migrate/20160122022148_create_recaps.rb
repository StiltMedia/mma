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
    200.times do
      t1 = Time.parse("2015-06-20 14:40:34")
      t2 = Time.now()
      Recap.create!(
        recap: Faker::Hipster.paragraphs(rand(1..3)).join(" "),
        user_id: User.all.sample(1)[0].id,
        restaurant_id: Restaurant.all.sample(1)[0].id,
        rdate: rand(t1..t2)
      )
    end
  end
end
