module Mutations
  class CreateClient < Mutations::BaseMutation
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :email, String, required: true
    argument :phone, String, required: false
    argument :manager_id, Integer, required: true

    field :client, Types::ClientType, null: true
    field :errors, [String], null: false

    def resolve(first_name:, last_name:, email:, phone:, manager_id:)
      manager = Manager.find(manager_id)
      client = manager.clients.create(first_name: first_name, last_name: last_name, email: email, phone: phone)

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
