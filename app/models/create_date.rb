class CreateDate < ApplicationRecord
  validates :savedate, presence: true
  validates :savetime, presence: true
end
