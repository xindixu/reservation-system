module Mutations
  module Clients
    class CreateClient < Mutations::BaseMutation
      argument :first_name, String, required: true
      argument :last_name, String, required: true
      argument :email, String, required: true
      argument :phone, String, required: true
      argument :cycle, Integer, required: true
      argument :duration, Integer, required: true
      argument :manager_ids, [ID], required: false

      field :client, Types::Models::ClientType, null: true
      field :errors, [String], null: false

      def resolve(**attributes)
        client = Client.create(**attributes)

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
