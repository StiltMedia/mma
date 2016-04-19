class PrefillSpecialsJob < ActiveJob::Base
  queue_as :default

  def perform(day, restaurant_id)

    specials_list = ['Oysters', 'Soup', 'Ceviche', 'Fish', 'Steak', 'Mix Grill']

    specials_list.each do |title|
      special = Special.new
      special.title = title
      special.special = "#{title} description"
      special.restaurant_id = restaurant_id
      special.sdate = day
      special.save!
    end
  end
end
