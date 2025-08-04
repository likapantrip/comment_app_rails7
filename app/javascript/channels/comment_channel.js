import consumer from "channels/consumer"

// 商品の詳細ページでのみ関数を動かす
if(location.pathname.match(/\/items\/\d/)){

  // サーバーから送られてきた@itemの情報を元に、それぞれの商品に紐づいたチャネルを使用するように定義
  consumer.subscriptions.create({
    channel: "CommentChannel",
    item_id: location.pathname.match(/\d+/)[0]
  }, {
      connected() {
        // Called when the subscription is ready for use on the server
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel

        // 受け取った情報を含んだhtmlを作成し、htmlという変数に代入
        const html = `
          <div class="comment">
            <p class="user-info">${data.user.nickname}： </p>
            <p>${data.comment.text}</p>
          </div>`
        
        // ブラウザ上のcommentsというidを持った要素を取得
        const comments = document.getElementById("comments")
        
        // comments要素の中の最後の子要素の後に、htmlを挿入(コメント欄の最後尾としてコメントが追加される)
        comments.insertAdjacentHTML('beforeend', html)

        // コメント投稿フォームの要素を取得し、フォームの中身をリセット(フォームに入力したコメントの文字が削除され、新しく次のコメントが入力できるようになる)
        const commentForm = document.getElementById("comment-form")
        commentForm.reset();
      }
  });
}