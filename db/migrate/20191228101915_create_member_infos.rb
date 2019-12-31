class CreateMemberInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :member_infos do |t|

      t.timestamps
    end
  end
end
