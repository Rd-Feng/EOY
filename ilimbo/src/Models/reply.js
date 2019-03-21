import React, { Component } from "react";
import './styles/comment_box.css';
import './styles/reply.css';
import SubCommentInputBox from './sub_comment_inputbox'


class Reply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show_reply: false,
      comment_id: this.props.comment_id
    }
  }
  handleReply() {
    this.setState({ show_reply: !this.state.show_reply });
  }
  render() {
    return (
      <div>
        <i
          style={this.state.like_color}
          onClick={() => { this.handleReply(); }}
        >&#x27A6;</i>
        {this.state.show_reply && <SubCommentInputBox comment_id={this.state.comment_id}/>}
      </div>
    )
  }
}

export default Reply;
