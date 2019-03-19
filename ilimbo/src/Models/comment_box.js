import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/comment_box.css';
import SubCommentList from './sub_comment_list'
import Like from './like'
import Reply from './reply'


class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: false
    }
    this.likeHandler = this.likeHandler.bind(this);
  }
  componentDidMount() {
    this.setState({
      user_id: this.props.user_id,
      text: this.props.text,
      created_at: this.props.created_at,
      likes: this.props.likes,
      sub_count: this.props.sub_count,
      comment_id: this.props.comment_id
    }, () => this.userInfo());
  }

  likeHandler() {
    let numLikes = this.state.likes
    if (!this.state.liked) {
      numLikes++
      this.setState({
	liked: true,
	likes: numLikes
      })
    }
    else {
      numLikes--
      this.setState({
	liked: false,
	likes: numLikes
      })
    }
  }
  userInfo() {
    fetch('http://localhost:4000/user/' + this.state.user_id)
      .then(response => response.json())
      .then(response => {
        this.setState({ user_info: response.data });
      });
  }
  render() {
    let cards;
    if (this.state.user_info) {
      cards = this.state.user_info.map(d => {
        return (
          <li className="comment-item">
            <div className="comment-main-level">
              <div className="comment-avatar">
                <img src={d.img_url} alt="" />
              </div>
              <div className="comment-box">
                <div className="comment-head">
                  <h6 className="comment-name by-author">
                    <a href="http://creaticode.com/blog">{d.first_name}{d.last_name}</a>
                  </h6><span>{this.state.created_at}</span>
                  <Like handler={this.likeHandler} likes={this.state.likes} comment_id={this.state.comment_id}/>
                  <Reply comment_id={this.state.comment_id}/>
                </div>
                <div className="comment-content">{this.state.text}
                </div>
              </div>
            </div>
            {this.state.sub_count > 0 && <SubCommentList comment_id={this.state.comment_id} sub_count={this.state.sub_count} />}
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
