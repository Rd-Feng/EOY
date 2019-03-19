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
        <section id="intro" className="intro_section"> <LandingHeader /></section>   
        <section  id='article' className="article_section"><Comment/></section>
        <section id='about' className="about_section"><About/></section>
      </div>
    )
  }
}

export default Landing;
