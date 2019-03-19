import React, { Component } from "react";

class BookmarkButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    fetch('http://localhost:4000/article_today')
    .then(res => res.json())
    .then(res => {
      this.setState({item_id: res.data});
    })
  }
  handleClick() {
    if (!JSON.parse(localStorage.getItem("id_token"))) {
      alert("please log in");
      return;
    }
      
    this.checkDuplicateBookmark().then(bool => {

      if (bool === "false") {
        console.log("duplicate entry");
        return;
      }
      fetch('http://localhost:4000/bookmark/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_id": JSON.parse(localStorage.getItem("id_token")),
          "item_id": this.state.item_id
        })	
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
    })
  }
  
  checkDuplicateBookmark() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/bookmarks/' + localStorage.getItem("id_token"))
      .then(res => res.json())
      .then(res => {
        for (let entry of res.data) {
          console.log(entry.item_id);
	  if (entry.item_id === this.state.item_id) {
            resolve("false");
	  }
        }
        resolve("true");
      })
    })
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => {this.handleClick()}}> Bookmark </button>
      </div>
    )
  }
}

export default BookmarkButton;
