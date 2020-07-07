module Mutations
  module Clients
    class DestroyClient < Mutations::BaseMutation
      argument :id, ID, required: true

      field :client, Types::ClientType, null: true
      field :errors, [String], null: false

      def resolve(id:)
        client = Client.find(id)

        if client.destroy
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
