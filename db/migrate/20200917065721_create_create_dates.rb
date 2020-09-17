class CreateCreateDates < ActiveRecord::Migration[6.0]
  def change
    create_table :create_dates do |t|
      t.date :savedate
      t.string :savetime
      t.timestamps
    end
  end
end
