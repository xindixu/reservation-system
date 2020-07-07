module Mutations
  module Slots
    class UpdateSlot < Mutations::BaseMutation
      argument :id, ID, required: true
      argument :name, String, required: false
      argument :description, String, required: false
      argument :shareable, Boolean, required: false
      argument :manager_id, ID, required: false

      field :slot, Types::SlotType, null: true
      field :errors, [String], null: false

      def resolve(id:, **attributes)
        slot = Slot.find(id)
        slot.update!(**attributes)
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