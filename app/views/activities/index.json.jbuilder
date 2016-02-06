json.array!(@activities) do |activity|
  json.extract! activity, :id, :activity, :ip, :geo_location, :browser_os, :details, :atime, :username
  json.url activity_url(activity, format: :json)
end
