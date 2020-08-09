module Mutations
  class CreateUser < BaseMutation
    class AuthProviderSignupData < Types::BaseInputObject
      argument :credentials, Types::AuthProviderCredentialsInput, required: false
    end
    argument :role, String, required: true
    argument :auth_provider, AuthProviderSignupData, required: false

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(role:, auth_provider: nil)
      user = User.create(
        role: role,
        email: auth_provider&.[](:credentials)&.[](:email),
        password: auth_provider&.[](:credentials)&.[](:password)
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