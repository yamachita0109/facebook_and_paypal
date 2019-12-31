class CreateApplyStatusHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :apply_status_histories do |t|

      t.timestamps
    end
  end
end
