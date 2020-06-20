class CreateSlotsVisitsJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :slots, :visits do |t|
      t.index :slot_id
      t.index :visit_id
    end
  end
end
