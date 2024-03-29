Rails.application.routes.draw do
  resources :activities
  resources :restaurant_products
  resources :inventory_checks
  resources :rcomments
  resources :recaps
  resources :ttcomments
  devise_for :users, :path => '', :path_names => {:sign_in => '/pages/login', :sign_out => 'logout'}, :controllers => {:registrations => "registrations"}
  get 'pages/login'

  get 'pages/account_home'
  get 'pages/restaurants'
  get 'pages/coming_soon'
  get 'pages/edit_profile'
  get 'pages/search'

  root 'pages#landing'

  resources :specials do
    collection do
      get 'show_picture'
    end
  end

  resources :users do
    collection do
      get 'show_picture'
    end
  end

  resources :thinktanks do
    collection do
      get 'show_picture'
    end
  end

  get '/administration' => 'pages#administration'
  get '/restaurants/:id/seek_n_show/:seek_date' => 'restaurants#seek_n_show'
  post '/seek' => 'restaurants#seek'
  get '/restaurants/:id/inventory/:seek_date' => 'restaurants#inventory'

  resources :restaurants do
    resources :specials
  end

  get 'restaurants/:id/pre_fill_specials' => 'restaurants#pre_fill_specials'

  get '/restaurants/:id/seek_bwd' => 'restaurants#seek_bwd'
  get '/restaurants/:id/seek_fwd' => 'restaurants#seek_fwd'

  get '/pages/calendar'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
