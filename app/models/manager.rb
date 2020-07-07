class Manager < ApplicationRecord
  validates :first_name, presence: true
  validates :email, presence: true, uniqueness: true

  belongs_to :team
  has_many :serves
  has_many :clients, through: :serves
  has_many :slots
end
