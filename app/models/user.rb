class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: %i[client manager admin]

  after_initialize :setup_user, if: :new_record?

  private

  def setup_user
    self.role ||= :client
  end
end
