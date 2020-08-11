module Types
  module Inputs
    class AuthProviderCredentialsInput < BaseInputObject
      argument :email, String, required: true
      argument :password, String, required: true
    end
  end
end
