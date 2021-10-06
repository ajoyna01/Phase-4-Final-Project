class EntrySerializer < ActiveModel::Serializer
  attributes :id, :title, :comment, :rating
  has_one :user
end
