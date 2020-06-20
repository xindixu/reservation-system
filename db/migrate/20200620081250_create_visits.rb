class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.datetime :starts_at
      t.datetime :ends_at
      t.boolean :all_day
      t.belongs_to :client, null: false, foreign_key: true
      t.belongs_to :slot, null: false, foreign_key: true

      t.timestamps
    end
  end
end
