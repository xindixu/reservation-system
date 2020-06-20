class Team < ApplicationRecord
  has_many :treatments
  has_many :managers
end
