class Visit < ApplicationRecord
  belongs_to :client
  belongs_to :slot
end
