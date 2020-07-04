class CreateManagers < ActiveRecord::Migration[6.0]
  def change
    create_table :managers do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.string :job_title
      t.string :password
      t.belongs_to :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
