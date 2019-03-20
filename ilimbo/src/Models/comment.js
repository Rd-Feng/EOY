import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/comment.css';
import CommentInputbox from './comment_inputbox';
import CommentList from './comment_list';
import BookmarkButton from './bookmark_button';
import ConnectionButton from './profile/connection_button';

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
  
    }
  }
  render() {
    return (
      <div className="comment-component">
        <p className="comment-invisible">about us invisible text for scrolling down</p>
        <div className="comment-title">
          <a href={this.props.article_url} target="_blank" rel="noopener noreferrer">{this.props.article_title}</a>
          <BookmarkButton />
	  <ConnectionButton />
        </div>
        <CommentInputbox article_id={this.props.article_id} />
        <CommentList article_id={this.props.article_id} />
      </div>
    )
  }
}

export default Comment;
