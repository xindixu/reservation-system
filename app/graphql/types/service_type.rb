module Types
  class ServiceType < Types::BaseObject
    field :id, ID, null: false
    field :client, Types::ClientType, null: false
    field :manager, Types::ManagerType, null: false
  end
end
