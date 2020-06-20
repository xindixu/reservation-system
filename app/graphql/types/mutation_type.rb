module Types
  class MutationType < Types::BaseObject
    field :create_manager, mutation: Mutations::CreateManager
    field :create_team, mutation: Mutations::CreateTeam
    field :create_client, mutation: Mutations::CreateClient
    field :create_slot, mutation: Mutations::CreateSlot
    field :create_visit, mutation: Mutations::CreateVisit
  end
end
