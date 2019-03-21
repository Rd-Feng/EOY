import React, { Component } from 'react'
import './styles/landing_header.css'
import LandingNavbar from './landing_navbar'
import './styles/common.css'


class LandingHeader extends Component {
  render() {
    return (
      <div>
        <LandingNavbar />
        <header className="landing_header">
          <div className="landing_slogan_container">
            <h1>Get One Hacker News Article Everyday</h1>
            <h3>See Article</h3>
            <div className="landing-scroll-down">
              <a onClick={() => document.getElementById("article").scrollIntoView()}>
                <div className="landing-circle-btn"><div className="arrow-down">&#8595;</div>
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
