module Mutations
  module Clients
    class UpdateClient < Mutations::BaseMutation
      argument :id, ID, required: true
      argument :first_name, String, required: false
      argument :last_name, String, required: false
      argument :email, String, required: false
      argument :phone, String, required: false
      argument :cycle, Integer, required: false
      argument :duration, Integer, required: false
      argument :manager_id, ID, required: false

      field :client, Types::ClientType, null: true
      field :errors, [String], null: false

      def resolve(id:, **attributes)
        client = Client.find(id)
        client.update!(**attributes)

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
