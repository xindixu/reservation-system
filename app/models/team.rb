class Team < ApplicationRecord
  has_many :managers
  has_many :slots
end
