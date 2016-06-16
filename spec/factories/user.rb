FactoryGirl.define do
  factory :user do
    email 'test@user.com'
    password 'password'

    trait :default do
      chef 'false'
    end

    trait :chef_role do
      chef 'true'
    end
  end
end
