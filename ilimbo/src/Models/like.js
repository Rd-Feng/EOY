import React, { Component } from "react";
import './styles/comment_box.css';


class Like extends Component {
  constructor(props) {
    super(props)
    this.state = {
      like_color: {},
      check_like: false,
      likes: this.props.likes
    }
  }
  handleLike() {
    this.setState({ check_like: !this.state.check_like });
    if (!this.state.check_like) {
      this.setState({ like_color: { 'color': 'red' } });
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
