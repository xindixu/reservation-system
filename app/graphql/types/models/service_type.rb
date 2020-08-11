module Types
  module Models
    class ServiceType < Types::BaseObject
      field :id, ID, null: false
      field :client, Types::Models::ClientType, null: false
      field :manager, Types::Models::ManagerType, null: false
    end
  end
end
