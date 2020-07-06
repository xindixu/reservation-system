module Mutations
  module Visits
    class CreateVisit < Mutations::BaseMutation
      argument :starts_at, GraphQL::Types::ISO8601Date, required: true
      argument :ends_at, GraphQL::Types::ISO8601Date, required: true
      argument :client_id, ID, required: true
      argument :slot_id, ID, required: true

      field :visit, Types::VisitType, null: true
      field :errors, [String], null: false

      def resolve(**attributes)
        visit = Visit.create(**attributes)

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
