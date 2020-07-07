module Types
  class MutationType < Types::BaseObject
    # Team
    field :create_team, mutation: Mutations::Teams::CreateTeam
    field :update_team, mutation: Mutations::Teams::UpdateTeam

    # Manager
    field :create_manager, mutation: Mutations::Managers::CreateManager
    field :update_manager, mutation: Mutations::Managers::UpdateManager

    # Client
    field :create_client, mutation: Mutations::Clients::CreateClient
    field :update_client, mutation: Mutations::Clients::UpdateClient
    field :destroy_client, mutation: Mutations::Clients::DestroyClient

    # Slot
    field :create_slot, mutation: Mutations::Slots::CreateSlot
    field :update_slot, mutation: Mutations::Slots::UpdateSlot
    field :destroy_slot, mutation: Mutations::Slots::DestroySlot

    # Visit
    field :create_visit, mutation: Mutations::Visits::CreateVisit
    field :update_visit, mutation: Mutations::Visits::UpdateVisit
    field :destroy_visit, mutation: Mutations::Visits::DestroyVisit
  end
end
