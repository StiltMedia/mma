
Meat Market App




app name is mma
heroku staging app name is mma-staging-01 

This app has an email address: mma.staging.01@gmai.com
with password: supersonic123

HEROKU DATABASE RESET INSTRUCTIONS

heroku pg:reset DATABASE_URL ; heroku run rake --trace db:migrate ; heroku run rake --trace db:seed

