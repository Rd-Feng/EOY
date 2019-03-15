import React, { Component } from 'react'
import './styles/landing_navbar.css'
import LandingHeader from './landing_header'


class Landing extends Component {
  render() {
    return (
      <div>
        <LandingHeader />
        <div>sds</div>
        <p>placeholder for about section</p>
        <p>sds</p>
        <p>sds</p>
        <section className="landing-article">
          <h2>Article:</h2>
          <p>placeholder for comment box</p>
        </section>
      </div>
    )
  }
}

export default Landing;
