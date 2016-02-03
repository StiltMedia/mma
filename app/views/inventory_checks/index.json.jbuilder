json.array!(@inventory_checks) do |inventory_check|
  json.extract! inventory_check, :id, :quantity, :idate, :restaurant_id, :product_id
  json.url inventory_check_url(inventory_check, format: :json)
end
