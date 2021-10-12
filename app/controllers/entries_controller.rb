class EntriesController < ApplicationController
    before_action :authorize

    def index
        entries = @current_user.entries
        render json: entries
    end
    def show
        entry = Entry.find_by(id: params[:id])
        render json: entry
    end
    def create
        entry = @current_user.entries.create!(entry_params)
        render json: entry, status: :created
    end
    def destroy
        entry = @current_user.entries.find_by(id: params[:id])
        if entry         
        entry.destroy
        render json: entry
        #head :no_content
        else
        render json: {error: "Not Authorized"}
        end
    end

    # def update
    #     entry = @current_user.entries.update(entry_params)
    #     if entry
    #         entry.save
    #     else
    #         render json: {error: "Ouch"}
    #     end
    # end


    # def update
    #     entry = @current_user.entries.find_by(id: params[:id])
    #     if entry
    #         entry.update(entry_params)
    #     else
    #         render json: {error: "Ouch"}
    #     end
    # end

    def update
        entry = @current_user.entries.find_by(id: params[:id])
        if entry.rating < 10
            entry.rating = entry.rating + 1
            entry.save
            render json: entry
        else
            render json: {error: "Max stokes reached"}

        end
    end

    private
    def entry_params
        params.permit(:title,:comment,:rating)
    end
end
