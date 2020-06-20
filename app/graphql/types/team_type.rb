module Types
  class TeamType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: false
    field :email, String, null: true
    field :phone, String, null: true
    field :managers, [Types::ManagerType], null: true
    field :managers_count, Integer, null: false

    def managers_count
      object.managers.count
    end

  end
end
