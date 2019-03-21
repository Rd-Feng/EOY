import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/comment_inputbox.css'
import {
  Button, FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";


class CommentInputBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      img: 'https://cdn6.aptoide.com/imgs/a/4/b/a4b426c239c0f0503c197022c52105af.png?w=240',
      img_url: JSON.parse(localStorage.getItem("ImgUrl")),
      id: JSON.parse(localStorage.getItem("id_token")),
      comment_border: {},
      comment_message: ''
    }
  }

  componentDidMount() {
    document.querySelector('textarea').addEventListener('keydown', this.autosize);
  }
  componentWillUnmount() {
    document.querySelector('textarea').removeEventListener('keydown', this.autosize);
  }

  autosize() {
    var el = this;
    setTimeout(function () {
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }
  handleCancel() {
    this.setState({
      comment_message: ''
    });
  }
  handleComment() {
    if (JSON.parse(localStorage.getItem("id_token"))){
      this.setState({article_id: this.props.article_id}, ()=> this.handleCommentPost())
    }
    else{
      alert("Login to comment");
    }

  }
  handleCommentPost(){
    fetch(process.env.REACT_APP_API + '/comment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        "text": this.state.comment_message,
        "creator": JSON.parse(localStorage.getItem("id_token")),
        "item_id": this.state.article_id
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.status === "success") {
        this.setState({comment_message: ''});
      } else {
        alert('Unable to comment at the momment.');
      }
    });
  }
  render() {
    return (
      <div className="comment_container">
        <div className="comment_inputbox_container">
          <textarea
            rows="1"
            id="comment_message"
            style={this.state.comment_border}
            placeholder="Your comment"
            value={this.state.comment_message}
            onChange={this.handleChange}>
          </textarea>
        </div>
        {this.state.comment_message.length > 0 && <div className="comment_button_container">
        {/* <img className="comment_inputbox_container_icon" src={this.state.img_url} />  */}
          <button className="comment_cancel_button" onClick={() => { this.handleCancel(); }}>
            Cancel
        </button>
          <button className="comment_submit_button" onClick={() => { this.handleComment(); }}>
            Comment
        </button>
        </div>}
      </div>
    )
  }
}

export default CommentInputBox;
