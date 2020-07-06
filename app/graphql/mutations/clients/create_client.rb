module Mutations
  module Clients
    class CreateClient < Mutations::BaseMutation
      argument :first_name, String, required: true
      argument :last_name, String, required: true
      argument :email, String, required: true
      argument :phone, String, required: true
      argument :cycle, Integer, required: true
      argument :duration, Integer, required: true
      argument :manager_id, ID, required: true

      field :client, Types::ClientType, null: true
      field :errors, [String], null: false

      def resolve(manager_id:, **attributes)
        manager = Manager.find(manager_id)
        client = manager.clients.create(**attributes)

        if client.save
          {
            client: client,
            errors: []
          }
        else
          {
            client: nil,
            errors: client.errors.full_messages
          }
        end
      end
    end
  end
end
