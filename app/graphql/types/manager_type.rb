module Types
  class ManagerType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :job_title, String, null: false
    field :email, String, null: true
    field :phone, String, null: true
    field :team, Types::TeamType, null: false
    field :clients, [Types::ClientType], null: true
    field :clients_count, Integer, null: false
    field :slots, [Types::SlotType], null: true
    field :slots_count, Integer, null: false

    def clients_count
      object.clients.count
    end
  end
end
