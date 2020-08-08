class User < ApplicationRecord

  validates :email, presence: true, uniqueness: true
  enum role: %i[client manager admin]

  after_initialize do
    if new_record?
      self.role ||= :manager
    end
  end
end
