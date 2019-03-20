import React, { Component } from "react";
import Homeheader from '../home/header'
import '../styles/connections.css'

class Connections extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	user_id: JSON.parse(localStorage.getItem("id_token"))
    }
  }

  componentDidMount() {
    let user_id = JSON.parse(localStorage.getItem("id_token"));
    fetch('http://localhost:4000/connections/' + user_id)
      .then(response => response.json())
      .then(response => {
	console.log(response);
	this.setState({ connections: response.data });	
      })
  }
  removeConnection(id) {
    fetch('http://localhost:4000/connections/disconnect', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user_id": this.state.user_id,
        "f_id": id
      })
    })
    .then(res => {
      console.log(res);
    })
  }
  render() {
    let cards = [];
    if (this.state.connections) {
      cards = this.state.connections.map(connection => {
        return (
          <div className="connection-card" id={connection.f_id}>
	    <button onClick={(e) => {this.removeConnection(e.target.id);}} className="button" id={connection.f_id}>
	      Remove Bookmark
            </button>
	    <div className="connection-link">
	      { connection.f_id } 
	    </div>
	  </div>
        )
      })    
    }
    if (cards.length === 0) {
      cards = <div className="null-container"> <div className="null-connection"> No connections found </div> <div className="null-image"> <img src="https://i.pinimg.com/originals/69/60/8c/69608c0575dfc760c33b5a2c3c8fe98f.png"/> </div>  </div>
    }
    return (
      <div className="connection-page">
        <Homeheader/>
        <div className="connection-container">
          {cards}
	</div>
      </div>
    )
  }
}

export default Connections;
