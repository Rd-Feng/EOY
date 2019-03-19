import React, { Component } from 'react'
import './styles/header.css'
import Navbar from './navbar'


class HomeHeader extends Component {
  render() {
    return (
      <div className="home_header">
        <Navbar />
      </div>
    )
  }
}

export default HomeHeader;