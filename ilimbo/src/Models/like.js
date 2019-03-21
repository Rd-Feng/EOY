import React, { Component } from "react";
import './styles/comment_box.css';


class Like extends Component {
  constructor(props) {
    super(props)
    this.state = {
      like_color: {},
      check_like: false,
      likes: this.props.likes,
      comment_id: this.props.comment_id
    }
  }

  handleLike() {
    if (JSON.parse(localStorage.getItem("id_token"))) {
      this.setState({ check_like: !this.state.check_like });
      let numLikes = this.state.likes
      if (!this.state.check_like) {
        numLikes++
        this.setState({ like_color: { 'color': 'red' }, likes: numLikes });
        this.incrNumLikes();
      }
      else {
        numLikes--
        this.setState({ like_color: { 'color': '#A6A6A6' }, likes: numLikes });
        this.decrNumLikes();
      }
    }
    else {
      alert("Login to Like the comment")
    }
  }
  incrNumLikes() {
    let commentType = this.props.isSubcomment ? "subcomment" : "comment";
    fetch(process.env.REACT_APP_API  + '/' + commentType + '_action' + '/' + this.state.comment_id + '/like')
      .then(res => res.json())
      .then(res => {
        if (res.status !== 'success') {
          alert('Unable to like/unlike at this time');
        }
      })
  }

  decrNumLikes() {
    let commentType = this.props.isSubcomment ? "subcomment" : "comment";
    fetch(process.env.REACT_APP_API + '/' +commentType + '_action' + '/' + this.state.comment_id + '/unlike')
      .then(res => res.json())
      .then(res => {
        if (res.status !== 'success') {
          alert('Unable to like/unlike at this time');
        }
      })
  }

  render() {
    return (
      <i
        style={this.state.like_color}
        onClick={() => { this.handleLike(); }}
      >&hearts; {this.state.likes}</i>
    )
  }
}

export default Like;
