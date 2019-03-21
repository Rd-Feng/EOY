import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/comment_box.css';
import CommentBox from './comment_box'


class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article_id: ''
    }
    this.GetComment = this.GetComment.bind(this);
    this.interval = setInterval(this.GetComment, 500);
  }
  static getDerivedStateFromProps(props, state) {
    state.article_id = props.article_id;
    return state;
  }
  GetComment(){
    if (!this.props.article_id) {
      return;
    }
    fetch(process.env.REACT_APP_API + '/comments/' +  this.state.article_id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        'pragma': 'no-cache'
      },
      body: JSON.stringify({
        token: response.getAuthResponse().id_token
      })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ comment_list: response.data });
      });
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  render() {
    let cards;
    if (this.state.comment_list) {
      cards = this.state.comment_list.map(d => {
        return (
          <CommentBox
            key={d.id}
            user_id={d.creator}
            text={d.text}
            created_at={d.created_at}
            likes={d.likes}
            sub_count={d.sub_count}
            comment_id={d.id} />
        )
      })
    }
    return (
      <div>
        {cards}
      </div>
    )
  }
}

export default CommentList;
