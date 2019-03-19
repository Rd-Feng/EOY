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

  // componentDidMount() {
  //   this.setState({
  //     user_id: this.props.user_id,
  //     text: this.props.text,
  //     created_at: this.props.created_at,
  //     likes: this.props.likes,
  //     sub_count: this.props.sub_count,
  //     comment_id: this.props.comment_id
  //   }, () => this.userInfo());
  // }
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
