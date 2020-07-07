class Client < ApplicationRecord
  has_many :serves
  has_many :managers, through: :serve
  has_many :visits, dependent: :destroy
  has_many :slots, through: :visits
end
