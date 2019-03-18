import React, { Component } from 'react'
import './styles/landing_navbar.css'
import LandingHeader from './landing_header'
import About from './about'
import Comment from './comment'
import './styles/landing_page.css'

class Landing extends Component {
  render() {
    return (
      <div>
        <section id="intro"> <LandingHeader /></section>   
        <section id='about'><About/></section>
        <section className="article_section" id='article'><Comment/></section>
      </div>
    )
  }
}

export default Landing;
