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
    # NOSEEDS require 'time'
    # NOSEEDS Restaurant.all.each do |restaurant|
    # NOSEEDS   start_date = Time.parse("2015-06-01T00:00:00-05:00") 
    # NOSEEDS   (365*1).times do |i|
    # NOSEEDS     (rand(1..3)).times do
    # NOSEEDS       restaurant.specials << Special.new(
    # NOSEEDS         title: Faker::Hipster.sentence,
    # NOSEEDS         special: Faker::Hipster.paragraphs(rand(1..3)).join(" "),
    # NOSEEDS         sdate: (start_date + i.days)
    # NOSEEDS       )
    # NOSEEDS     end
    # NOSEEDS   end
    # NOSEEDS end
  end
end
