class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  enum role: %i[client manager admin]

  after_initialize do
    self.role ||= :manager if new_record?
  end
end
