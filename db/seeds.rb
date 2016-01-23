# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.all.each do |user|
  user.picture = (open("app/assets/images/chef-#{rand(2..6)}.jpg", 'rb') { |f| f.read })
  user.save
end

Thinktank.all.each do |thinktank|
  thinktank.picture = (open("app/assets/images/thinktank-#{rand(2..6)}.jpg", 'rb') { |f| f.read })
  thinktank.save
end

