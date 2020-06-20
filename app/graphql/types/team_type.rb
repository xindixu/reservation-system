module Types
  class TeamType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: false
    field :email, String, null: true
    field :phone, String, null: true
    field :treatments, [Types::TreatmentType], null: false
    field :treatments_count, Integer, null: false

    def treatment_count
      object.treatments.size
    end
  end
end
