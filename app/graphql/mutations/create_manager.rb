class Mutations::CreateManager < Mutations::BaseMutation
  argument :firstName, String, required: true
  argument :lastName, String, required: true
  argument :email, String, required: true
  argument :teamId, Integer, required: true

  field :manager, Types::ManagerType, null: true
  field :errors, [String], null: false

  def resolve(first_name:, last_name:, email:, team_id:)
    team = Team.find(team_id)
    manager = team.managers.create(first_name: first_name, last_name: last_name, email: email)

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