module Mutations
  module Teams
    class CreateTeam < Mutations::BaseMutation
      argument :name, String, required: true
      argument :description, String, required: false
      argument :email, String, required: false
      argument :phone, String, required: false

      field :team, Types::TeamType, null: true
      field :errors, [String], null: false

      def resolve(name:, description:, email:, phone:)
        team = Team.create(name: name, description: description, email: email, phone: phone)

        if team.save
          {
            team: team,
            errors: []
          }
        else
          {
            team: nil,
            errors: team.errors.full_messages
          }
        end
      end
    end
  end
end