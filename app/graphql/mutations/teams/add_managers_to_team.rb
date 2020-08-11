module Mutations
  module Teams
    class AddManagersToTeam < Mutations::BaseMutation
      argument :id, ID, required: true
      argument :manager_ids, [ID], required: true

      field :team, Types::Models::TeamType, null: true
      field :errors, [String], null: false

      def resolve(id:, manager_ids:)
        team = Team.find(id)
        manager_ids.each do |manager_id|
          manager = Manager.find(manager_id)
          team.managers << manager unless team.managers.include? manager
        end

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
