module Types

  class QueryType < Types::BaseObject
    # /teams
    field :teams, [Types::Models::TeamType], null: false

    def teams
      Team.all.order(:name, :id)
    end

    field :team, Types::Models::TeamType, null: false do
      argument :id, ID, required: true
    end

    def team(id:)
      Team.find(id)
    end

    # /managers
    field :managers, [Types::Models::ManagerType], null: false

    def managers
      Manager.all.order(:first_name, :last_name, :id)
    end

    field :manager, Types::Models::ManagerType, null: false do
      argument :id, ID, required: true
    end

    def manager(id:)
      Manager.find(id)
    end

    # /clients
    field :clients, [Types::Models::ClientType], null: false

    def clients
      Client.all.order(:first_name, :last_name, :id)
    end

    field :client, Types::Models::ClientType, null: false do
      argument :id, ID, required: true
    end

    def client(id:)
      Client.find(id)
    end

    # /slots
    field :slots, [Types::Models::SlotType], null: false

    def slots
      Slot.all.order(:name, :id)
    end

    field :slot, Types::Models::SlotType, null: false do
      argument :id, ID, required: true
    end

    def slot(id:)
      Slot.find(id)
    end

    # /visits
    field :visits, [Types::Models::VisitType], null: false

    def visits
      Visit.all.order(:starts_at, :ends_at, :id)
    end

    field :visit, Types::Models::VisitType, null: false do
      argument :id, ID, required: true
    end

    def visit(id:)
      Visit.find(id)
    end

    field :search_visits, [Types::Models::VisitType], null: true do
      argument :manager_ids, [ID], required: false
      argument :client_ids, [ID], required: false
      argument :slot_ids, [ID], required: false
    end

    def search_visits(options={})
      if options[:manager_ids].present?
        managers = Manager.preload(:clients, :slots).find(options[:manager_ids])
        client_ids_for_manager = managers.map(&:clients).flatten.pluck(:id)
        slot_ids_for_manager = managers.map(&:slots).flatten.pluck(:id)
      end

      Visit.where(client_id: [*options[:client_ids], *client_ids_for_manager])
           .or(Visit.where(slot_id: [*options[:slot_ids], *slot_ids_for_manager]))
           .order(:starts_at, :ends_at, :id)
    end

    # /services
    field :services, [Types::Models::ServiceType], null: false

    def services
      Service.all
    end

    field :service, Types::Models::ServiceType, null: false do
      argument :id, ID, required: true
    end

    def service(id:)
      Service.find(id)
    end

    # /user
    field :user, Types::Models::UserType, null: false do
      argument :id, ID, required: true
    end

    def user(id:)
      User.find(id)
    end
  end
end
