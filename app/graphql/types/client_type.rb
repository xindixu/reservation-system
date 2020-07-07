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
    field :visits, [Types::VisitType], null: true
    field :managers_count, Integer, null: false
    field :visits_count, Integer, null: false

    def visits
      client = Client.find(object.id)
      client.visits
    end

    def managers
      client = Client.find(object.id)
      client.managers
    end

    def managers_count
      object.managers.size || 0
    end

    def visits_count
      object.visits.size || 0
    end
  end
end
