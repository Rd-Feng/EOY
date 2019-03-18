import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/comment_box.css';



class SubCommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sub_num: props.sub_num,
      showSubcomment: false,
      comment: [{ 'id': 'id1', 'text': 'sub comment good', 'by': 'sumin', 'created_at': '3/1/2019', 'like': 3, 'sub': 0, 'item_id': 1, 'img_url': 'https://lh3.googleusercontent.com/-7LvIlVZjf28/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3re9QknibrFVpzrvwezha8gZ6yiLlw/s96-c/photo.jpg' },
      { 'id': 'id2', 'text': 'sub comment Nice', 'by': 'Jian', 'created_at': '3/1/2019', 'like': 0, 'sub': 0, 'item_id': 2, 'img_url': 'https://cdn6.aptoide.com/imgs/a/4/b/a4b426c239c0f0503c197022c52105af.png?w=240' }]
    }
  }
  handleSubcomment(){
    this.setState({showSubcomment: !this.state.showSubcomment})
  }
  render() {
    console.log(this.state.sub_num)
    let cards;
    if (this.state.comment) {
      cards = this.state.comment.map(d => {
        return (
          <li className="sub-comment-item">
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
          </li>
        )
      })
    }
    return (
      <div className="comment-box-container">
        {this.state.sub_num > 1 && <button onClick={()=> {this.handleSubcomment();}}>view replies</button>}
         {this.state.sub_num === 1 && <button onClick={()=> {this.handleSubcomment();}}>view reply</button>}
        {this.state.showSubcomment && <ul className="comments-list reply-list">
          {cards}
        </ul>}
      </div>
    )
  }
}

export default SubCommentBox;