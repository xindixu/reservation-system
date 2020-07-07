module Types
  class ClientType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :email, String, null: true
    field :phone, String, null: true
    field :cycle, Integer, null: true
    field :duration, Integer, null: true
    field :managers, [Types::ManagerType], null: true
    field :serves, [Types::ServeType], null: true
    field :visits, [Types::VisitType], null: true

    def serves
      Serve.where(client_id: object.id)
    end

    def visits
      Visit.where(client_id: object.id)
    end

    def managers
      manager_ids = object.serves.map(&:manager_id)
      Manager.where(id: manager_ids)
    end

  end
end
