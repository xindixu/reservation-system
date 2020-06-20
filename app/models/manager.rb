class Manager < ApplicationRecord
  belongs_to :team
  has_many :clients
  has_many :slots
end
