json.array!(@thinktanks) do |thinktank|
  json.extract! thinktank, :id, :title, :user_id, :thinktank, :picture
  json.url thinktank_url(thinktank, format: :json)
end
