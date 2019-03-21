import React, { Component } from "react";
import HomeHeader from './header'
import './styles/home.css'
import Comment from '../comment'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {     
    }
  }
  componentDidMount() {
    fetch(process.env.REACT_APP_API + '/article_today')
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
      <div >
        <section><HomeHeader/></section>
        <section className="home_section">
        <Comment
        article_url = {this.state.article_url}
        article_title = {this.state.article_title}
        article_id = {this.state.article_id}
        /></section>
        </div>
    )
  }
}

export default Home;
