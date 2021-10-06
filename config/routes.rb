Rails.application.routes.draw do

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  resources :entries
  # delete "/entries/:id", to: "entries#destroy"
  # patch "/entries/:id", to: "entries#update"
  # get "/entries", to: "entries#index"
  # get "/entries/:id", to: "entries#show"
  # post "/entries", to: "entries#create"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
