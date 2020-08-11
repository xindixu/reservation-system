module Types
  module Models
    class ManagerType < Types::BaseObject
      field :id, ID, null: false
      field :first_name, String, null: false
      field :last_name, String, null: false
      field :job_title, String, null: false
      field :email, String, null: true
      field :phone, String, null: true
      field :team, Types::Models::TeamType, null: false
      field :clients, [Types::Models::ClientType], null: true
      field :clients_count, Integer, null: false
      field :slots, [Types::Models::SlotType], null: true
      field :slots_count, Integer, null: false

      def clients
        manager = Manager.find(object.id)
        manager.clients
      end

      def clients_count
        object.clients.count
      end

      def slots
        manager = Manager.find(object.id)
        manager.slots
      end

      def slots_count
        object.slots.count
      end
    end
  end
end
