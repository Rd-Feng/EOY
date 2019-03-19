import React, { Component } from "react";

class Bookmark extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.setState({user_id: localStorage.getItem("id_token")});
    fetch('http://localhost:4000/bookmarks?user_id=' + this.state.user_id)
      .then(response => response.json())
      .then(response => {
      	//console.log(response.data[0].id);
	this.setState({ bookmarks: response.data });	
      });
  }
  
  render() {
    let cards;
    if (this.state.bookmarks) {
      cards = this.state.bookmarks.map(bookmark => {
        return (
          <div>
	    <ul>
	      <li> {bookmark.item_id} </li>
	      <li> {bookmark.created_at} </li>
	    </ul>
	  </div>
	)
      })
    }
    return (
      <div>
        {cards}
	I WILL FIX THIS. TODO: UI
      </div>
    )
  }
}

export default Bookmark;
