class CreateAdminAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :admin_accounts do |t|

      t.timestamps
    end
  end
end
