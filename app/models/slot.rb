class Slot < ApplicationRecord
  belongs_to :manager
  belongs_to :team
  has_many :clients, through: :visits
end
