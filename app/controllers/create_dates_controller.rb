class CreateDatesController < ApplicationController

  def new
    @create_dates = Form::CreateDateCollection.new
  end

  def create
    @form = Form::CreateDateCollection.new(create_date_params)
    if @form.save
      redirect_to root_path
    else
      render :new
    end
  end

  private
    def create_date_params
      params
        .require(:form_create_date_collection)
        .permit(create_dates_attributes: :savedate)
    end
end