module Mutations
  module Teams
    class UpdateTeam < Mutations::BaseMutation
      argument :id, ID, required: true
      argument :name, String, required: false
      argument :description, String, required: false
      argument :email, String, required: false
      argument :phone, String, required: false

      field :team, Types::Models::TeamType, null: true
      field :errors, [String], null: false

      def resolve(id:, **attributes)
        team = Team.find(id)
        team.update!(**attributes)

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
