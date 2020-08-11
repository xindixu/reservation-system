module Mutations
  module Managers
    class CreateManager < Mutations::BaseMutation
      argument :first_name, String, required: true
      argument :last_name, String, required: true
      argument :email, String, required: true
      argument :phone, String, required: true
      argument :job_title, String, required: true
      argument :client_ids, [ID], required: false
      argument :team_id, ID, required: true

      field :manager, Types::Models::ManagerType, null: true
      field :errors, [String], null: false

      def resolve(team_id:, **attributes)
        team = Team.find(team_id)
        manager = team.managers.create(**attributes)

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
end
