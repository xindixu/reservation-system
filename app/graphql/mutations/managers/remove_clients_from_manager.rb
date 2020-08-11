module Mutations
  module Managers
    class RemoveClientsFromManager < Mutations::BaseMutation
      argument :id, ID, required: true
      argument :client_ids, [ID], required: true

      field :manager, Types::Models::ManagerType, null: true
      field :errors, [String], null: false

      def resolve(id:, client_ids:)
        manager = Manager.find(id)
        manager.clients.find(client_ids).each do |client|
          manager.clients.delete(client)
        end
        if manager.save
          {
            manager: manager,
            errors: []
          }
        else
          {
            errors: manager.errors.full_messages
          }
        end
      end
    end
  end
end
