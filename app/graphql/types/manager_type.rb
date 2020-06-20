module Types
  class ManagerType < Types::BaseObject
    field :id, ID, null: false
    field :firstName, String, null: false
    field :lastName, String, null: false
    field :email, String, null: true
    field :phone, String, null: true
    field :team, Types::TeamType, null: false
  end
end
