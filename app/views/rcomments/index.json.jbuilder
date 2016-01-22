json.array!(@rcomments) do |rcomment|
  json.extract! rcomment, :id, :rcomment, :user_id, :recap_id
  json.url rcomment_url(rcomment, format: :json)
end
