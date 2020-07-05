module Mutations
  module Visits
    class CreateVisit < Mutations::BaseMutation
      argument :starts_at, GraphQL::Types::ISO8601Date, required: true
      argument :ends_at, GraphQL::Types::ISO8601Date, required: true
      argument :all_day, Boolean, required: true
      argument :client_id, ID, required: true
      argument :slot_id, ID, required: true

      field :visit, Types::VisitType, null: true
      field :errors, [String], null: false

      def resolve(starts_at:, ends_at:, all_day:, client_id:, slot_id:)
        visit = Visit.create(starts_at: starts_at, ends_at: ends_at, all_day: all_day, client_id: client_id, slot_id: slot_id)

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
