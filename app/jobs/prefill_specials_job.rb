class PrefillSpecialsJob < ActiveJob::Base
  queue_as :default

  def perform(day, restaurant_id)

    specials_list = ['Oysters', 'Soup', 'Ceviche', 'Fish', 'Steak', 'Mix Grill']

    specials_list.each do |title|
      # special = Special.new
      # special.title = title
      # special.special = "#{title} description"
      # special.picture = nil
      # special.restaurant_id = restaurant_id
      # special.sdate = day
      # special.save
      Special.create(
        title: title,
        special: "#{title} description",
        picture: nil,
        restaurant_id: restaurant_id,
        sdate:  day
      )
    end
    r = Restaurant.find(restaurant_id)
    r.specials_templates.create(
      restaurant_id: restaurant_id,
      sdate: day,
      template_created: true
    )
  end
end
