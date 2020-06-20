class CreateSlots < ActiveRecord::Migration[6.0]
  def change
    create_table :slots do |t|
      t.string :name
      t.string :description
      t.boolean :sharable
      t.belongs_to :manager, null: false, foreign_key: true
      t.belongs_to :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
