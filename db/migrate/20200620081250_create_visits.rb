class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.datetime :start
      t.datetime :end
      t.boolean :all_day
      t.belongs_to :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end
