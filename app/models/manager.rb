class Manager < ApplicationRecord
  belongs_to :team, class_name: "team", foreign_key: "team_id"
  has_many :clients, class_name: "clients", foreign_key: "client_id"
  has_many :slots, class_name: "slot", foreign_key: "slot_id"
end
