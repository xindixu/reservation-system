module Types
  class TreatmentType < Types::BaseObject
    field :name, String, null: false
    field :description, String, null: false
  end
end
