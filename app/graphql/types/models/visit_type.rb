module Types
  module Models
    class VisitType < Types::BaseObject
      field :id, ID, null: false
      field :starts_at, GraphQL::Types::ISO8601Date, null: false
      field :ends_at, GraphQL::Types::ISO8601Date, null: false
      field :client, Types::Models::ClientType, null: false
      field :slot, Types::Models::SlotType, null: false
    end
  end
end
