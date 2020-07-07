module Mutations
  module Slots
    class DestroySlot < Mutations::BaseMutation
      argument :id, ID, required: true

      field :slot, Types::SlotType, null: true
      field :errors, [String], null: false

      def resolve(id:)
        slot = Slot.find(id)

        if slot.destroy
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
