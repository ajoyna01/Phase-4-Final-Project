class Entry < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :comment, length: {minimum: 1}
end
