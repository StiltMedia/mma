json.array!(@recaps) do |recap|
  json.extract! recap, :id, :recap, :user_id, :restaurant_id, :rdate
  json.url recap_url(recap, format: :json)
end
