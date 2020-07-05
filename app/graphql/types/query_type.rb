module Types
  class QueryType < Types::BaseObject
    # /managers
    field :managers, [Types::ManagerType], null: false

    def managers
      Manager.all
    end

    field :manager, Types::ManagerType, null: false do
      argument :id, ID, required: true
    end

    def manager(id:)
      Manager.find(id)
    end

    # /teams
    field :teams, [Types::TeamType], null: false

    def teams
      Team.all
    end

    field :team, Types::TeamType, null: false do
      argument :id, ID, required: true
    end

    def team(id:)
      Team.find(id)
    end

    # /clients
    field :clients, [Types::ClientType], null: false

    def clients
      Client.all
    end

    field :client, Types::ClientType, null: false do
      argument :id, ID, required: true
    end

    def client(id:)
      Client.find(id)
    end

    # /slots
    field :slots, [Types::SlotType], null: false

    def slots
      Slot.all
    end

    field :slot, Types::SlotType, null: false do
      argument :id, ID, required: true
    end

    def slot(id:)
      Slot.find(id)
    end

    # /visits
    field :visits, [Types::VisitType], null: false

    def visits
      Visit.all
    end

    field :visit, Types::VisitType, null: false do
      argument :id, ID, required: true
    end

    def visit(id:)
      Visit.find(id)
    end

  end
end
