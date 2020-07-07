class Client < ApplicationRecord
  belongs_to :manager
  has_many :visits, dependent: :destroy
  has_many :slots, through: :visits
end
