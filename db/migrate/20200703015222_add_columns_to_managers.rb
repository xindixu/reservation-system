class AddColumnsToManagers < ActiveRecord::Migration[6.0]
  def change
    add_column :managers, :avatar, :json
    add_column :managers, :job_title, :string
    add_column :managers, :password, :string
  end
end
