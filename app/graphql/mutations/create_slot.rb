module Mutations
  class CreateSlot < Mutations::BaseMutation
    argument :name, String, required: true
    argument :description, String, required: false
    argument :shareable, Boolean, required: true
    argument :team_id, Integer, required: true
    argument :manager_id, Integer, required: true

    field :slot, Types::SlotType, null: true
    field :errors, [String], null: false

    def resolve(name:, description:, shareable:, manager_id:, team_id:)
      slot = Slot.create(name: name, description: description, shareable: shareable, manager_id: manager_id, team_id: team_id)

      if slot.save
        {
          slot: slot,
          errors: []
        }
      else
        {
          slot: nil,
          errors: slot.errors.full_messages
        }
      end
    end
  end
end
