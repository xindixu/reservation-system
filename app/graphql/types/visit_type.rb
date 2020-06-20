module Types
  class VisitType < Types::BaseObject
    field :id, ID, null: false
    field :starts_at, GraphQL::Types::ISO8601Date, null: false
    field :ends_at, GraphQL::Types::ISO8601Date, null: false
    field :all_day, Boolean, null: false
    field :client, Types::ClientType, null: false
    field :slot, Types::SlotType, null: false
  end
end
