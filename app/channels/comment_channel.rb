class CommentChannel < ApplicationCable::Channel
  def subscribed
    # パラメーターから送られてきた商品の情報を元に、@itemを定義
    @item = Item.find(params[:item_id])
    # @itemに関連したデータの経路を指定
    stream_for @item
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
