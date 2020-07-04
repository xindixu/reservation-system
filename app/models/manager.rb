class Manager < ApplicationRecord
  validates :first_name, presence: true
  validates :email, presence: true, uniqueness: true

  belongs_to :team
  has_many :clients
  has_many :slots
end
