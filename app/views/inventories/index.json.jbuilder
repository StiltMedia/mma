json.array!(@inventories) do |inventory|
  json.extract! inventory, :id, :restaurant_id, :quantity, :product
  json.url inventory_url(inventory, format: :json)
end
