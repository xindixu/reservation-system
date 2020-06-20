class Client < ApplicationRecord
  belongs_to :manager, class_name: "manager", foreign_key: "manager_id"
  has_many :visits, class_name: "visit", foreign_key: "visit_id"
end
