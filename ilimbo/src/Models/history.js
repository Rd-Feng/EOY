import React, { Component } from "react";
import HomeHeader from './home/header'
import Comment from './comment'
import './styles/history.css'



class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/item/' + this.props.location.pathname.split("/")[2] + '.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ article_url: data.url, article_title: data.title });
      })
  }
  render() {
    return (
      <div >
        <section><HomeHeader /></section>
        <section className="history_section">
          <Comment
            article_url={this.state.article_url}
            article_title={this.state.article_title}
            article_id={this.props.location.pathname.split("/")[2]}
          /></section>
      </div>
    )
  }
}

export default History;
