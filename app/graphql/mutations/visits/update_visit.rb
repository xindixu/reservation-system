module Mutations
  module Visits
    class UpdateVisit < Mutations::BaseMutation
      argument :id, ID, required: true
      argument :starts_at, GraphQL::Types::ISO8601Date, required: false
      argument :ends_at, GraphQL::Types::ISO8601Date, required: false
      argument :all_day, Boolean, required: false
      argument :slot_id, ID, required: false
  
      field :visit, Types::VisitType, null: true
      field :errors, [String], null: false
  
      def resolve(id:, **options)
        visit = Visit.find(id)
        visit.update!(**options)
  
        if visit.save
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
