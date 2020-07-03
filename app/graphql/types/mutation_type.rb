module Types
  class MutationType < Types::BaseObject
    field :create_client, mutation: Mutations::CreateClient
    field :create_manager, mutation: Mutations::CreateManager
    field :create_slot, mutation: Mutations::CreateSlot
    field :create_team, mutation: Mutations::CreateTeam
    field :create_visit, mutation: Mutations::CreateVisit

    field :update_manager, mutation: Mutations::UpdateManager

  end
end
