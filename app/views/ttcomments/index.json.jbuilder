json.array!(@ttcomments) do |ttcomment|
  json.extract! ttcomment, :id, :user_id, :ttcomment, :thinktank_id
  json.url ttcomment_url(ttcomment, format: :json)
end
