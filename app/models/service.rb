class Service < ApplicationRecord
  belongs_to :manager
  belongs_to :client
end
