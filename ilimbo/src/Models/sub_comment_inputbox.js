import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import './styles/sub_comment_inputbox.css'
import {
  Button, FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";


class SubCommentInputBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      img: 'https://cdn6.aptoide.com/imgs/a/4/b/a4b426c239c0f0503c197022c52105af.png?w=240',
      img_url: JSON.parse(localStorage.getItem("ImgUrl")),
      id: JSON.parse(localStorage.getItem("id_token")),
      sub_comment_message: '',
      comment_id: this.props.comment_id
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
      sub_comment_message: ''
    });
  }

  handleComment(){
    if(JSON.parse(localStorage.getItem("id_token"))){
      fetch('http://localhost:4000/subcomment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "text": this.state.sub_comment_message,
          "creator": JSON.parse(localStorage.getItem("id_token")),
          "comment_id": this.state.comment_id
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response.status !== 'success') {
          this.setState({ err_msg: "Error"});
          let err = new Error();
          throw err;
        } else {
          this.setState({sub_comment_message: ''})
        }
      })
      .catch(err => console.log(err))
    }
    else{
      alert("Login to comment")
    }
  }
  render() {
    return (
      <div className="sub_comment_container">
        <div className="sub_comment_inputbox_container">
          <textarea
            rows="1"
            id="sub_comment_message"
            style={this.state.comment_border}
            placeholder="Your reply"
            value={this.state.sub_comment_message}
            onChange={this.handleChange}>
          </textarea>
        </div>
        {this.state.sub_comment_message.length > 0 && <div className="sub_comment_button_container">
          <button className="sub_comment_cancel_button" onClick={() => { this.handleCancel(); }}>
            Cancel
        </button>
          <button className="sub_comment_submit_button" onClick={() => { this.handleComment(); }}>
            Comment
        </button>
        </div>}
      </div>
    )
  }
}

export default SubCommentInputBox;
