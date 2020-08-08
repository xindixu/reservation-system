Rails.application.routes.draw do
  devise_for :users
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphql", graphql_path: "graphql#execute"
  end

  post "/graphql", to: "graphql#execute"

end
