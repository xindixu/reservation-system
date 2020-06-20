module Mutations
  class CreateManager < Mutations::BaseMutation
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :email, String, required: true
    argument :phone, String, required: false
    argument :team_id, Integer, required: true

    field :manager, Types::ManagerType, null: true
    field :errors, [String], null: false

    def resolve(first_name:, last_name:, email:, phone:, team_id:)
      team = Team.find(team_id)
      manager = team.managers.create(first_name: first_name, last_name: last_name, email: email, phone: phone)

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
