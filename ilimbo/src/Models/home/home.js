import React, { Component } from "react";
import Navbar from './navbar'
import './styles/home.css'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {     
    }
  }
 
  render() {
    return (
      <div className="home">
        <Navbar/>
        </div>
    )
  }
}

export default Home;
