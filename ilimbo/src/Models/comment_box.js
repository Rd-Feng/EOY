import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/comment_box.css';
import SubCommentList from './sub_comment_list'
import Like from './like'
import Reply from './reply'
import moment from 'moment'
import {withRouter} from 'react-router-dom';


class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
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
          <li key={d.id} className="comment-item">
            <div className="comment-main-level">
              <div className="comment-avatar">
                <img src={d.img_url} alt="" />
              </div>
              <div className="comment-box">
                <div className="comment-head">
                  <h6 className="comment-name by-author">
                    <a onClick={() => this.props.history.push('/profile/' + d.id)}>{d.first_name} {d.last_name}</a>
                  </h6><span>{moment(this.state.created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                  <Like likes={this.state.likes} comment_id={this.state.comment_id}/>
                  <Reply comment_id={this.state.comment_id}/>
                </div>
                <div className="comment-content">{this.state.text}
                </div>
              </div>
            </div>
            <SubCommentList comment_id={this.state.comment_id}/>
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

export default withRouter(CommentBox);
