import React, { Component } from 'react'
import Oauth from './oauth'
import './styles/landing_responsive_navbar.css'


class LandingResNavbar extends Component {
  render() {
    return (
      <div className="res_collapse res_navbar-collapse">
              <ul className='res_nav res_navbar-nav res_navbar-text-color'>
                <li className="res_active"><a href="#intro">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a onClick={() => document.getElementById("article").scrollIntoView()}>Article</a></li>
                <li><Oauth /></li>
              </ul>
        </div>
    )
  }
}

export default LandingResNavbar;
