import React, { Component } from "react";
import Homeheader from './home/header'
import './styles/bookmarks.css';
import {withRouter} from 'react-router-dom';

class Bookmark extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	user_id: JSON.parse(localStorage.getItem("id_token"))
    }
  }

  componentDidMount() {
    let user_id = localStorage.getItem("id_token");
    let titles = []
    fetch('http://localhost:4000/bookmarks/' + user_id)
      .then(response => response.json())
      .then(response => {
	this.setState({ bookmarks: response.data }, () => {
	  this.state.bookmarks.forEach(bookmark => {
	    fetch('https://hacker-news.firebaseio.com/v0/item/' + bookmark.item_id + '.json').then(res => res.json())
	    .then(res => {
	      let obj = {[bookmark.item_id]: res.title}
	      titles.push(obj)
	    })
	    .then(_ => {
	      this.setState({title: titles})
	    })
	  })
        })
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
  linkHandler(id) {
    this.props.history.push('/history/' + id);
  }
  render() {
    let cards = [];
    if (this.state.title) {
      cards = this.state.title.map((bookmark, index) => {
        let id = Object.keys(bookmark)[0]
	console.log(this.state.bookmarks[index])
	return (
  	  <div class="card">
          <div class="card-details">
            <h2 class="card-head"> {bookmark[id]} </h2>
            <a href="#/" class="card-action-button" onClick={(e) => {this.removeBookmark(e.target.id);}} id={id} >REMOVE</a>
            <a href="#/" class="card-action-button" onClick={() => {this.linkHandler(id);}}>READ</a>
          </div>
        </div>
        )
      })
    }
    if (cards.length === 0) {
      cards = <div className="null-container"> <div className="null-bookmark"> No bookmarks found </div> </div>
    }
    return (
      <div className="bookmarkpage">
        {cards}
      </div>
    )
  }
}

export default withRouter(Bookmark);
