module Mutations
  module Users
    class CreateUser < BaseMutation
      argument :role, String, required: true
      argument :credentials, Types::Inputs::AuthProviderCredentialsInput, required: true

      field :user, Types::Models::UserType, null: true
      field :errors, [String], null: false

      def resolve(role:, credentials:)
        user = User.create(
          role: role,
          email: credentials[:email],
          password: credentials[:password]
        )

        if user.save
          {
            user: user,
            errors: []
          }
        else
          {
            user: nil,
            errors: user.errors.full_messages
          }
        end
      end
    end
  end
end
