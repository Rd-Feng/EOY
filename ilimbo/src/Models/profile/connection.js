import React, { Component } from "react";
import Homeheader from '../home/header'
import '../styles/connections.css'
import {withRouter} from 'react-router-dom';

class Connections extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
              let arr = []
	      let data = res.data[0]
	      arr.push(data.first_name);
	      arr.push(data.last_name);
	      arr.push(data.email);
	      let obj = {[connection.f_id]: arr}
	      list.push(obj);
	    })
	    .then(_ => {
	      this.setState({followers: list})
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
    if (this.state.connections && this.state.followers) {
      cards = this.state.connections.map(connection => {
	let arr;
	for (let i of this.state.followers){
          if (Object.keys(i)[0] === connection.f_id) {
	    arr = i[connection.f_id];
	    break;
	  }
	}

	return (
	  <div class="card">
	    <img src={JSON.parse(localStorage.getItem("ImgUrl"))} class="card-media" />
	    <div class="card-details">
	      <h2 class="card-head"> {arr[0] + ' ' +arr[1]}</h2>
	      <h2 class="card-body"> {arr[2]} </h2>
	      <a class="card-action-button" href={'http://localhost:3000/profile/' + connection.f_id} id={connection.f_id}> PROFILE </a>
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
