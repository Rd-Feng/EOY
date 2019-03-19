import React, { Component } from "react";
import './styles/comment_box.css';


class Like extends Component {
  constructor(props) {
    super(props)
    this.state = {
      like_color: {},
      check_like: false,
      likes: this.props.likes,
      isSubcomment: this.props.isSubcomment,
      comment_id: this.props.comment_id
    }
  }
  handleLike() {
    this.setState({ check_like: !this.state.check_like });
    if (!this.state.check_like) {
      this.setState({ like_color: { 'color': 'red' } });
      if (!this.state.isSubcomment) {
        var like_url = 'http://localhost:4000/comment/' + this.state.comment_id + '/like';
      }
      else {
        var like_url = 'http://localhost:4000/subcomment/' + this.state.comment_id + '/like';
      }
      fetch(like_url)
        .then(response => response.json())
        .then(response => {
          this.setState({ like_info: response.status });
        });
    }
    else {
      this.setState({ like_color: { 'color': '#A6A6A6' } });
    }
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
