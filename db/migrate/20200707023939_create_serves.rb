class CreateServes < ActiveRecord::Migration[6.0]
  def change
    create_table :serves do |t|
      t.belongs_to :manager, null: false, foreign_key: true
      t.belongs_to :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end
