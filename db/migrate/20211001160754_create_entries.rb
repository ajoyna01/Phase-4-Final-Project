class CreateEntries < ActiveRecord::Migration[6.1]
  def change
    create_table :entries do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :title
      t.text :comment
      t.integer :rating

      t.timestamps
    end
  end
end
