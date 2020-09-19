class CreateDatesController < ApplicationController

  def index
    @create_dates = CreateDate.all.order(id: 'DESC')
  end

  def new
    @create_dates = CreateDateCollection.new
  end

  def create
    @create_dates = CreateDateCollection.new(create_date_params)
    if @create_dates.save
      redirect_to action: :index
    else
      render :new
    end
  end

  private
    def create_date_params
      params.require(:create_dates)
    end
end