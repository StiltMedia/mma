class CreateSpecials < ActiveRecord::Migration
  def change
    create_table :specials do |t|
      t.text :special
      t.string :title
      t.binary :picture
      t.references :restaurant, index: true, foreign_key: true
      t.timestamp :sdate

      t.timestamps null: false
    end
  end

  def data
    Restaurant.all.each do |restaurant|
      (rand(1..6)).times do
        t1 = Time.parse("2015-06-20 14:40:34")
        t2 = Time.now()
        restaurant.specials << Special.new(
          title: Faker::Hipster.sentence,
          special: Faker::Hipster.paragraphs(rand(1..3)).join(" "),
          sdate: rand(t1..t2)
        )
      end
    end
  end
end
