import React, { Component } from "react";
import HomeHeader from './header'
import './styles/home.css'
// import Comment from './comment'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {     
    }
  }
 
  render() {
    return (
      <div >
        <HomeHeader/>
        </div>
    )
  }
}

export default Home;
