import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/comment.css';
import CommentInputbox from './comment_inputbox';
import CommentList from './comment_list';
import BookmarkButton from './bookmark_button';


class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    fetch('http://localhost:4000/article_today')
      .then(response => response.json())
      .then(response => {
        this.setState({ article_id: response.data})
        fetch('https://hacker-news.firebaseio.com/v0/item/' + response.data + '.json')
          .then(response => response.json())
          .then(data => {
            this.setState({ article_url: data.url, article_title: data.title });
          })
      })
  }
  render() {
    return (
      <div className="comment-component">
        <p className="comment-invisible">about us invisible text for scrolling down</p>
        <div className="comment-title">
          <a href={this.state.article_url} target="_blank" rel="noopener noreferrer">{this.state.article_title}</a>
	  <BookmarkButton/>
        </div>
        <CommentInputbox article_id={this.state.article_id}/>
        <CommentList article_id={(() => {console.log('asdf', this.state.article_id); return this.state.article_id})()}/>
      </div>
    )
  }
}

export default Comment;
