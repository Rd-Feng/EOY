import React, { Component } from 'react'
import './styles/landing_navbar.css'
import LandingHeader from './landing_header'
import About from './about'
import Comment from './comment'
import './styles/landing_page.css'

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    fetch('http://localhost:4000/article_today')
      .then(response => response.json())
      .then(response => {
        this.setState({ article_id: response.data})
        fetch('https://hacker-news.firebaseio.com/v0/item/' + response.data + '.json')
          .then(response => response.json())
          .then(data => {
            this.setState({ article_url: data.url, article_title: data.title });
          })
      })
  }
  render() {
    return (
      <div>
        <section id="intro" className="intro_section"> <LandingHeader /></section>   
        <section  id='article' className="article_section">
        <Comment
        article_url = {this.state.article_url}
        article_title = {this.state.article_title}
        article_id = {this.state.article_id}
        /></section>
        <section id='about' className="about_section"><About/></section>
      </div>
    )
  }
}

export default Landing;
