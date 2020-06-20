module Types
  class MutationType < Types::BaseObject
    field :create_manager, mutation: Mutations::CreateManager
  end
end
