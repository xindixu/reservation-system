module Types
  class SlotType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: true
    field :shareable, Boolean, null: false
    field :manager, Types::ManagerType, null: false
    field :team, Types::TeamType, null: false
    field :visits, [Types::VisitType], null: true

    def visits
      Visit.where(slot_id: object.id)
    end
  end
end
