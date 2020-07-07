module Mutations
  module Managers
    class UpdateManager < Mutations::BaseMutation
      argument :id, ID, required: true
      argument :first_name, String, required: false
      argument :last_name, String, required: false
      argument :email, String, required: false
      argument :phone, String, required: false
      argument :job_title, String, required: false
      argument :client_ids, [ID], required: false
      argument :team_id, ID, required: false

      field :manager, Types::ManagerType, null: true
      field :errors, [String], null: false

      def resolve(id:, **attributes)
        manager = Manager.find(id)
        manager.update!(**attributes)

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
