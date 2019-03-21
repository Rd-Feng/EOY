import React, { Component } from "react";
import Homeheader from '../home/header'
import '../styles/connections.css'
import {withRouter} from 'react-router-dom';

class Connections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      follow: [],
      user_id: JSON.parse(localStorage.getItem("id_token"))
    }
  }
  componentDidMount() {
    let list = []
    let user_id = this.props.match.params.user_id;
    fetch('http://localhost:4000/connections/' + user_id)
    .then(response => response.json())
    .then(response => {
      this.setState({ connections: response.data }, () => {
        this.state.connections.forEach(connection => {
          fetch('http://localhost:4000/user/' + connection.f_id)
          .then(res => res.json())
          .then(res => {
            this.state.follow.push(res.data[0]);
          })
        })
      })
    })
  }
  visitConnection(id) {
    this.props.history.push('/profile/' + id);
  }
  render() {
    let cards = [];
      if (this.state.follow) {
        cards = this.state.follow.map(connection => {        
        return (       
          <div className="card" key={connection.id}>
            <img src={connection.img_url} className="card-media" />
            <div className="card-details">
              <h2 className="card-head"> {connection.first_name} {connection.last_name}</h2>
              <h2 className="card-body"> {connection.email} </h2>
              <a className="card-action-button" href={'http://localhost:3000/profile/' + connection.id} id={connection.id}> PROFILE </a>
            </div>
          </div>
        )
      })
    }
    if (cards.length === 0) {
      cards =  <div className="null-connection"> No connections found </div> 
    }
    return (
      <div className="connection-page">
        <div className="connection-container">
          {cards}
        </div>
      </div>
    )
  }
}

export default withRouter(Connections);
