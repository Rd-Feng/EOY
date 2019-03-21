import React, { Component } from "react";
import './styles/bookmark_button.css'

class BookmarkButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item_id: this.props.item_id,
    }
  }
  static getDerivedStateFromProps(props, state) {
    let user_id = localStorage.getItem("id_token");
    if (user_id) {
      user_id = JSON.parse(user_id);
      fetch(process.env.REACT_APP_API + '/bookmarks/' + user_id)
        .then(response => response.json())
        .then(response => {
          let bookmarks = [];
          for (let bookmark of response.data) {
            bookmarks.push(bookmark.item_id);
          }
          if (bookmarks.includes(props.item_id)) {
            document.getElementById('unbookmark').style.display = 'block';
            document.getElementById('bookmark').style.display = 'none';
          } else {
            document.getElementById('unbookmark').style.display = 'none';
            document.getElementById('bookmark').style.display = 'block';
          }
        })
    }
    return state;
  }
  handleClick(action) {
    if (!JSON.parse(localStorage.getItem("id_token"))) {
      alert("please log in");
      return;
    }
    fetch(process.env.REACT_APP_API + '/bookmark/' + (action === 'bookmark' ? 'add' : 'remove'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user_id": JSON.parse(localStorage.getItem("id_token")),
        "item_id": this.props.item_id
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.status === 'success') {
        if (action === 'bookmark') {
          document.getElementById('unbookmark').style.display = 'block';
          document.getElementById('bookmark').style.display = 'none';
        } else {
          document.getElementById('unbookmark').style.display = 'none';
          document.getElementById('bookmark').style.display = 'block';
        }
      }
    })
  }

  checkDuplicateBookmark() {
    return new Promise((resolve, reject) => {
      fetch(process.env.REACT_APP_API + '/bookmarks/' + localStorage.getItem("id_token"))
      .then(res => res.json())
      .then(res => {
        for (let entry of res.data) {
	  if (entry.item_id === this.props.item_id) {
            resolve("false");
	  }
        }
        resolve("true");
      })
    })
  }
  render() {
    let bookmarked = false;
    if (this.state.bookmarked) {
      bookmarked = true;
    }
    return (
      <div>
        <button id='bookmark' style={{display: 'block'}} className="btn_bookmark" onClick={() => {this.handleClick('bookmark')}}> Bookmark </button>
        <button id='unbookmark' style={{display: 'none'}} className="btn_unbookmark" onClick={() => {this.handleClick('unbookmark')}}> Unbookmark </button>
      </div>
    )
  }
}

export default BookmarkButton;
