class Slot < ApplicationRecord
  belongs_to :team, class_name: "team", foreign_key: "team_id"
  belongs_to :manager, class_name: "manager", foreign_key: "manager_id"
  has_and_belongs_to_many :visit, join_table: "slots_visits", foreign_key: "visit_id"
end
