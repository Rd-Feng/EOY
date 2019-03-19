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
    console.log("img", this.state.img_url)
    console.log("id", this.state.id)
    document.querySelector('textarea').addEventListener('keydown', this.autosize);
    // fetch('http://localhost:4000/signin=' + this.state.id_token, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     "token": this.state.id_token
    //   })
    // })
    //   .then(response => response.json())
    //   .then(response =>{
    //    console.log("data", response.data)
    //   })
    //   .catch(err => console.log(err))
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
    fetch('http://localhost:4000/comment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        "text": this.state.comment_message,
        "creator": this.state.id,
        "item_id": "123456"
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.status === "success")
        console.log("Sucessfully insertion of comment into DB");
      else
      	console.log("Error occurred while inserting comment into DB");
    })	
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
