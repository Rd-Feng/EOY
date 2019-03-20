import React, { Component } from "react";
import Homeheader from './home/header'
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
    fetch('http://localhost:4000/bookmarks/' + user_id)
      .then(response => response.json())
      .then(response => {
	this.setState({ bookmarks: response.data });	
      })
      .then(_ => {
        let titles = []
	this.state.bookmarks.forEach(bookmark => {
          fetch('https://hacker-news.firebaseio.com/v0/item/' + bookmark.item_id + '.json').then(res => res.json())
	  .then(res => {
	    titles.push(res.title)
	  })
	})
        return titles;
      })
      .then(requests => {
        console.log(requests);
      })
  }
  removeBookmark(id) {
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
    let cards = [];
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
    if (cards.length === 0) {
      cards = <div className="null-container"> <div className="null-bookmark"> No bookmarks found </div> <div className="null-image"> <img src="https://i.pinimg.com/originals/69/60/8c/69608c0575dfc760c33b5a2c3c8fe98f.png"/> </div>  </div>
    }
    return (
      <div className="bookmark-page">
        <Homeheader/>
        <div className="bookmark-container">
          {cards}
	</div>
      </div>
    )
  }
}

export default Bookmark;
