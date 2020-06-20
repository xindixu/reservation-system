module Types
  class QueryType < Types::BaseObject
    # /managers
    field :managers, [Types::ManagerType], null: false

    def managers
      Manager.all
    end

    field :manager, Types::ManagerType, null: false do
      argument :id, ID, required: true
    end

    def manager(id:)
      Manager.find(id)
    end


    # /treatments
  end
end
