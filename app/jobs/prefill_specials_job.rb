class PrefillSpecialsJob < ActiveJob::Base
  queue_as :default

  def perform(day, restaurant_id)

    specials_list = ['Oysters', 'Soup', 'Ceviche', 'Fish', 'Steak', 'Mix Grill',
    'Wine of the Day']

    specials_list.each do |title|
      Special.create(
        title: title,
        special: "#{title} description",
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
