module Types
  module Models
    class UserType < Types::BaseObject
      field :id, ID, null: false
      field :email, String, null: false
      field :role, String, null: false
    end
  end
end
