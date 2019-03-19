import React, { Component } from "react";
import './styles/bookmarks.css';

class Bookmark extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	user_id: JSON.parse(localStorage.getItem("id_token"))
    }
  }


  componentDidMount() {
    let user_id = localStorage.getItem("id_token");
    let articles;
    fetch('http://localhost:4000/bookmarks/' + user_id)
      .then(response => response.json())
      .then(response => {
	this.setState({ bookmarks: response.data });	
      })
  }
  removeBookmark(id) {
    console.log(this.state.user_id);
    console.log(id);
    fetch('http://localhost:4000/bookmark/remove', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user_id": this.state.user_id,
        "item_id": id
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
  }
  render() {
    let cards;
    if (this.state.bookmarks) {
      cards = this.state.bookmarks.map(bookmark => {
          return (
            <div className="bookmark-card" id={bookmark.item_id}>
	      <button onClick={(e) => {this.removeBookmark(e.target.id);}} className="button" id={bookmark.item_id}>
	        Remove Bookmark
              </button>
	      <div className="bookmark-link">
	        { bookmark.item_id } 
	      </div>
	      <div className="bookmark-date">
	        { bookmark.created_at }
	      </div>
	    </div>
	  )
      })
    }
    return (
      <div className="bookmark-page">
        <div className="bookmark-container">
          {cards}
	</div>
      </div>
    )
  }
}

export default Bookmark;
