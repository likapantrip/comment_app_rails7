class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)

    # パラメーターから送られてきた商品の情報を元に、@itemを定義
    @item = Item.find(params[:item_id])
    if @comment.save
      # CommentChannelというチャネルを通して、@itemに紐づいた経路で、Javascriptにコメントと送信者のデータを送信
      CommentChannel.broadcast_to @item, { comment: @comment, user: @comment.user }
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:text).merge(user_id: current_user.id, item_id: params[:item_id])
  end
end