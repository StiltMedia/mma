json.array!(@restaurant_products) do |restaurant_product|
  json.extract! restaurant_product, :id, :restaurant_id, :product_id
  json.url restaurant_product_url(restaurant_product, format: :json)
end
