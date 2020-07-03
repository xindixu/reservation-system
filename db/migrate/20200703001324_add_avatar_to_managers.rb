class AddAvatarToManagers < ActiveRecord::Migration[6.0]
  def change
    add_column :managers, :avatar, :json
  end
end
