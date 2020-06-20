class Visit < ApplicationRecord
  belongs_to :client, class_name: "client", foreign_key: "client_id"
  has_and_belongs_to_many :slot, join_table: "slots_visits", foreign_key: "slot_id"
end
