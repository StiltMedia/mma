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
    require 'time'
    Restaurant.all.each do |restaurant|
      start_date = Time.parse("2015-01-01T00:00:00-05:00") 
      (365*2).times do |i|
        (rand(1..3)).times do
          restaurant.specials << Special.new(
            title: Faker::Hipster.sentence,
            special: Faker::Hipster.paragraphs(rand(1..3)).join(" "),
            sdate: (start_date + i.days)
          )
        end
      end


      #(rand(1..6)).times do
      #  t1 = Time.parse("2015-06-20 14:40:34")
      #  t2 = Time.now()
      #  restaurant.specials << Special.new(
      #    title: Faker::Hipster.sentence,
      #    special: Faker::Hipster.paragraphs(rand(1..3)).join(" "),
      #    sdate: rand(t1..t2)
      #  )
      #end
    end
  end
end
