module Types
  module Models
    class SlotType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :description, String, null: true
      field :shareable, Boolean, null: false
      field :manager, Types::Models::ManagerType, null: false
      field :team, Types::Models::TeamType, null: false
      field :visits, [Types::Models::VisitType], null: true

      def visits
        Visit.where(slot_id: object.id)
      end
    end
  end
end
