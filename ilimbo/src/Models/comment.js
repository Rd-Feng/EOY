import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/comment.css';
import CommentInputbox from './comment_inputbox';
import CommentList from './comment_list';



class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="comment-component">
        <div className="comment-title">
          <p className="comment-invisible">about us invisible text for scrolling down</p>
          <h1>Article Title</h1>
        </div>
        <CommentInputbox />
        <CommentList />
        <p>sds</p>
        <p>sds</p>
        <p>sds</p>
        <p>sds</p>
        <p>sds</p>
        <p>sds</p>
        <p>sds</p>
        <p>sds</p>
      </div>
    )
  }
}

export default Comment;
