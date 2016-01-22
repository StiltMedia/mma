json.array!(@specials) do |special|
  json.extract! special, :id, :special, :title, :picture, :restaurant_id, :sdate
  json.url special_url(special, format: :json)
end
