class Manager < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true

  belongs_to :team
  
  has_many :services, dependent: :destroy
  has_many :clients, through: :services

  has_many :slots
end
