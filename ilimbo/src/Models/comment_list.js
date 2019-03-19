import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/comment_box.css';
import CommentBox from './comment_box'


class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    console.log(this.interval);
    fetch('http://localhost:4000/comments/' +  '123456')
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
