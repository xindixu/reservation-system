class Team < ApplicationRecord
  has_many :treatments, :managers
end
