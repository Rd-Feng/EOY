import React, { Component } from "react";

class ConnectionButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.setState({f_id: "104020629187522078959"});
  }
  handleClick() {
    if (!JSON.parse(localStorage.getItem("id_token"))) {
      alert("please log in");
      return;
    }
      
    this.checkDuplicateConnection().then(bool => {

      if (bool === "false") {
        console.log("duplicate entry");
        return;
      }
      fetch('http://localhost:4000/connections/connect', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_id": JSON.parse(localStorage.getItem("id_token")),
          "f_id": this.state.f_id
        })	
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
    })
  }
  
  checkDuplicateConnection() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/connections/' + JSON.parse(localStorage.getItem("id_token")))
      .then(res => res.json())
      .then(res => {
	for (let connection of res.data) {
	  if (connection.f_id === this.state.f_id) {
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
        <button className="button" onClick={() => {this.handleClick()}}> Connect </button>
      </div>
    )
  }
}

export default ConnectionButton;
