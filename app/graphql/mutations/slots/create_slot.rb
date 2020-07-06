module Mutations
  module Slots
    class CreateSlot < Mutations::BaseMutation
      argument :name, String, required: true
      argument :description, String, required: false
      argument :shareable, Boolean, required: true
      argument :manager_id, ID, required: true
  
      field :slot, Types::SlotType, null: true
      field :errors, [String], null: false
  
      def resolve(manager_id:, **attribute)
        team_id = Manager.find(manager_id).team_id
        slot = Slot.create(**attribute, manager_id: manager_id, team_id: team_id)
  
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
end
