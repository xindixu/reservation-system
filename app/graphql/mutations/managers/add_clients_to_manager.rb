module Mutations
  module Managers
    class AddClientsToManager < Mutations::BaseMutation
      argument :id, ID, required: true
      argument :client_ids, [ID], required: true

      field :manager, Types::Models::ManagerType, null: true
      field :errors, [String], null: false

      def resolve(id:, client_ids:)
        manager = Manager.find(id)
        clients = Client.find(client_ids)
        clients.each do |client|
          manager.clients << client unless manager.clients.include? client
        end

        if manager.save
          {
            manager: manager,
            errors: []
          }
        else
          {
            manager: nil,
            errors: manager.errors.full_messages
          }
        end
      end
    end
  end
end
