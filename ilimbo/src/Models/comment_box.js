import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/comment_box.css';
import SubCommentBox from './subcomment_box'


class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: [{ 'id': 'id1', 'text': 'good', 'by': 'sumin', 'created_at': '3/1/2019', 'like': 3, 'sub': 0, 'item_id': 1, 'img_url': 'https://lh3.googleusercontent.com/-7LvIlVZjf28/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3re9QknibrFVpzrvwezha8gZ6yiLlw/s96-c/photo.jpg' },
      { 'id': 'id2', 'text': 'Nice', 'by': 'Jian', 'created_at': '3/1/2019', 'like': 0, 'sub': 0, 'item_id': 2, 'img_url': 'https://cdn6.aptoide.com/imgs/a/4/b/a4b426c239c0f0503c197022c52105af.png?w=240' }]
    }
  }

  render() {
    console.log(this.state.comment)
    let cards;
    if (this.state.comment) {
      cards = this.state.comment.map(d => {
        return (
          <li className="comment-item">
            <div className="comment-main-level">
              <div className="comment-avatar">
                <img src={d.img_url} alt="" />
              </div>
              <div className="comment-box">
                <div className="comment-head">
                  <h6 className="comment-name by-author">
                    <a href="http://creaticode.com/blog">{d.by}</a>
                  </h6><span>{d.created_at}</span>
                </div>
                <div className="comment-content">{d.text}
                </div>
              </div>
            </div>
            <SubCommentBox/>
          </li>
        )
      })
    }
    return (
      <div className="comments-container">
      <ul id="comments-list" className="comments-list">
        {cards}
      </ul>
      </div>
    )
  }
}

export default CommentBox;
