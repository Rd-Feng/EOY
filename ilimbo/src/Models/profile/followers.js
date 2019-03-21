import React, { Component } from "react";
import Homeheader from '../home/header'
import './styles/connections.css';
import {withRouter} from 'react-router-dom';

class Followers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      follow: [],
      user_id: JSON.parse(localStorage.getItem("id_token"))
    }
  }
  componentDidMount() {
    let f_id = this.props.match.params.user_id;
    fetch(process.env.REACT_APP_API + '/connections/followers/' + f_id)
    .then(response => response.json())
    .then(response => {
      console.log(response.data)
      this.setState({ connections: response.data }, () => {
        this.state.connections.forEach(connection => {
          fetch(process.env.REACT_APP_API + '/user/' + connection.user_id)
          .then(res => res.json())
          .then(res => {
            this.state.follow.push(res.data[0]);
            if(res.data[0]){
              this.setState({found_connection: true})
            }
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
          <a key={connection.id} className="card-action-button" href={process.env.REACT_APP_DOMAIN + '/profile/' + connection.id} id={connection.id}>
            <div className="card" key={connection.id}>
              <img src={connection.img_url} className="card-media" />
              <div className="card-details">
                <h2 className="card-head"> {connection.first_name} {connection.last_name}</h2>
                <h2 className="card-body"> {connection.email} </h2>
              </div>
            </div>
          </a>
        )
      })
    }
    if (!this.state.found_connection) {
      cards =  <div className="null-connection"> No followers found </div>
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

export default withRouter(Followers);
