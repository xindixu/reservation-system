module Mutations
  module Teams
    class CreateTeam < Mutations::BaseMutation
      argument :name, String, required: true
      argument :description, String, required: false
      argument :email, String, required: false
      argument :phone, String, required: false

      field :team, Types::Models::TeamType, null: true
      field :errors, [String], null: false

      def resolve(**attributes)
        team = Team.create(**attributes)

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
