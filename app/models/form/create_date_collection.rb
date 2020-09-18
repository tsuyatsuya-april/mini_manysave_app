class Form::CreateDateCollection < Form::Base
  DATE_NUM = 5  # 同時にユーザーを作成する数
  attr_accessor :create_dates

  def initialize(attributes = {})
    super attributes
    self.create_dates = DATE_NUM.times.map { CreateDate.new() } unless self.create_dates.present?
  end
  
  # 上でsuper attributesとしているので必要
  def create_dates_attributes=(attributes)
    self.create_dates = attributes.map { |_, v| CreateDate.new(v) }
  end

  def save
    # 実際にやりたいことはこれだけ
    # self.memos.map(&:save!)

    # 複数件全て保存できた場合のみ実行したいので、transactionを使用する
    CreateDate.transaction do
      self.create_dates.map(&:save!)
    end
      return true
    rescue => e
      return false
  end
end