class Client < ApplicationRecord
  has_many :services, dependent: :destroy
  has_many :managers, through: :services

  has_many :visits, dependent: :destroy
  has_many :slots, through: :visits
end
