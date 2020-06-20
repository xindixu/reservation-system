class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.string :name
      t.text :description
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
