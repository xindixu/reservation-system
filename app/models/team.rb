class Team < ApplicationRecord
  has_many :managers, class_name: "manager", foreign_key: "manager_id"
  has_many :slots, class_name: "slot", foreign_key: "slot_id"
end
