import React, { Component } from "react";
import './styles/comment_box.css';
import Like from './like'


class SubCommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubcomment: false,
    }
  }
  componentDidMount() {
    this.setState({
      user_id: this.props.user_id,
      text: this.props.text,
      created_at: this.props.created_at,
      sub_count: this.props.sub_count,
      likes: this.props.likes,
      sub_id: this.props.sub_id
    }, () => this.userInfo());
  }
  userInfo() {
    fetch('http://localhost:4000/user/' + this.state.user_id)
      .then(response => response.json())
      .then(response => {
        console.log("info", response.data)
        this.setState({ user_info: response.data });
      });
  }
  handleSubcomment() {
    this.setState({ showSubcomment: !this.state.showSubcomment })
  }
  render() {
    console.log(this.state.sub_num)
    let cards;
    if (this.state.user_info) {
      cards = this.state.user_info.map(d => {
        return (
          <li className="sub-comment-item">
            <div className="comment-avatar">
              <img src={d.img_url} alt="" />
            </div>
            <div className="comment-box">
              <div className="comment-head">
                <h6 className="comment-name by-author">
                  <a href="http://creaticode.com/blog">{d.first_name}{d.last_name}</a>
                </h6><span>{this.state.created_at}</span>
                <Like likes={this.state.likes} isSubcomment={true} comment_id={this.state.sub_id} />
              </div>
              <div className="comment-content">{this.state.text}
              </div>
            </div>
          </li>
        )
      })
    }
    return (
      <div className="comment-box-container">
        {this.state.sub_count > 1 && <button onClick={() => { this.handleSubcomment(); }}>view replies</button>}
        {this.state.sub_count === 1 && <button onClick={() => { this.handleSubcomment(); }}>view reply</button>}
        {this.state.showSubcomment && <ul className="comments-list reply-list">
          {cards}
        </ul>}
      </div>
    )
  }
}

export default SubCommentBox;