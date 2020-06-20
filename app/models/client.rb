class Client < ApplicationRecord
  belongs_to :manager
  has_many :slots, through: :visits
end
