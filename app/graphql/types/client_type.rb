module Types
  class ClientType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :email, String, null: true
    field :phone, String, null: true
    field :cycle, Integer, null: true
    field :duration, Integer, null: true
    field :manager, Types::ManagerType, null: false
    field :visits, [Types::VisitType], null: true

    def visits
      Visit.where(client_id: object.id)
    end
  end
end
