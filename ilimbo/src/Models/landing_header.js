import React, { Component } from 'react'
import './styles/landing_header.css'
import LandingNavbar from './landing_navbar'


class LandingHeader extends Component {
  render() {
    return (
      <div>
        <LandingNavbar />
        <header className="landing_header">
          <div className="landing_slogan_container">
            <h1>Get One Hacker News Article Everyday</h1>
            <h3>Placeholder</h3>
            <div className="landing-scroll-down">
              <a href="#service">
                <div className="landing-circle-btn"><div className="arrow-down">&#10515;</div>
                </div>
              </a>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

export default LandingHeader;