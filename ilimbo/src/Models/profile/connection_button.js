import React, { Component } from "react";
import './styles/connection_button.css';

class ConnectionButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    let profile_id = this.props.profile_id;
    let user_id = JSON.parse(localStorage.getItem('id_token'));
    if (user_id !== profile_id) {
      fetch('http://localhost:4000/connections/' + user_id)
        .then(response => response.json())
        .then(response => {
          let connections = response.data;
          if (connections.includes(profile_id)) {
            document.getElementById('follow').style.display = 'none';
            document.getElementById('unfollow').style.display = 'block';
          } else {
            document.getElementById('follow').style.display = 'block';
            document.getElementById('unfollow').style.display = 'none';
          }
        })
    }
  }
  handleClick(action) {
    if (!JSON.parse(localStorage.getItem("id_token"))) {
      alert("please log in");
      return;
    }
    fetch('http://localhost:4000/connections/' + (action === 'follow' ? 'connect' : 'disconnect'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: JSON.parse(localStorage.getItem("id_token")),
        f_id: this.props.profile_id
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.status === 'success') {
        console.log('success')
        if (action === 'follow') {
          document.getElementById('unfollow').style.display = 'block';
          document.getElementById('follow').style.display = 'none';
        } else {
          document.getElementById('unfollow').style.display = 'none';
          document.getElementById('follow').style.display = 'block';
        }
      }
    })
  }
  render() {
    let profile_id = this.props.profile_id;
    let user_id = JSON.parse(localStorage.getItem('id_token'));
    if (user_id === profile_id) {
      return (<div></div>);
    } else {
      return (
        <div>
          <button id='follow' className="btn_follow" style={{displey: 'none'}} onClick={() => {this.handleClick('follow')}}> Follow </button>
          <button id='unfollow' className="btn_unfollow" style={{displey: 'none'}} onClick={() => {this.handleClick('unfollow')}}> Unfollow </button>
        </div>
      )
    }
  }
}

export default ConnectionButton;
