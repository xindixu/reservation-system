module Mutations
  module Visits
    class DestroyVisit < Mutations::BaseMutation
      argument :id, ID, required: true

      field :visit, Types::VisitType, null: true
      field :errors, [String], null: false

      def resolve(id:)
        visit = Visit.find(id)
  
        if visit.destroy
          {
            visit: visit,
            errors: []
          }
        else
          {
            visit: nil,
            errors: visit.errors.full_messages
          }
        end
      end
    end
  end
end
