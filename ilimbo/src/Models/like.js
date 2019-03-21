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
  componentDidMount () {
    let commentType = this.props.isSubcomment ? "subcomment" : "comment";
    let myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    let myInit = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(process.env.REACT_APP_API  + '/' + commentType + '/' + this.state.comment_id, myInit)
      .then(response => response.json())
      .then(response => {
        this.setState(likes: response.data[0].likes });
      })
  }
  handleLike() {
    let commentType = this.props.isSubcomment ? "subcomment" : "comment";
    if (JSON.parse(localStorage.getItem("id_token"))) {
      this.setState({ check_like: !this.state.check_like });
      let myHeaders = new Headers();
      myHeaders.append('pragma', 'no-cache');
      myHeaders.append('cache-control', 'no-cache');
      let myInit = {
        method: 'GET',
        headers: myHeaders,
      };
      if (!this.state.check_like) {
        fetch(process.env.REACT_APP_API  + '/' + commentType + '/' + this.state.comment_id, myInit)
          .then(response => response.json())
          .then(response => {
            this.setState({ like_color: { 'color': 'red' }, likes: response.data[0].likes+1 });
            this.incrNumLikes();
          })
      }
      else {
        fetch(process.env.REACT_APP_API  + '/' + commentType + '/' + this.state.comment_id, myInit)
          .then(response => response.json())
          .then(response => {
            this.setState({ like_color: { 'color': '#A6A6A6' }, likes: response.data[0].likes-1 });
            this.decrNumLikes();
          })
      }
    }
    else {
      alert("Login to Like the comment")
    }
  }
  incrNumLikes() {
    let commentType = this.props.isSubcomment ? "subcomment" : "comment";
    let myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    let myInit = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(process.env.REACT_APP_API  + '/' + commentType + '_action' + '/' + this.state.comment_id + '/like', myInit)
      .then(res => res.json())
      .then(res => {
        if (res.status !== 'success') {
          alert('Unable to like/unlike at this time');
        } else {
          console.log({status: 'succcess'});
        }
      })
  }

  decrNumLikes() {
    let commentType = this.props.isSubcomment ? "subcomment" : "comment";
    let myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    let myInit = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(process.env.REACT_APP_API + '/' +commentType + '_action' + '/' + this.state.comment_id + '/unlike', myInit)
      .then(res => res.json())
      .then(res => {
        if (res.status !== 'success') {
          alert('Unable to like/unlike at this time');
        } else {
          console.log({status: 'succcess'});
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
