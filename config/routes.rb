Rails.application.routes.draw do
  mount_graphql_devise_for 'User', at: 'graphql_auth'
  devise_for :users
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphql", graphql_path: "graphql#execute"
  end

  post "/graphql", to: "graphql#execute"

end
