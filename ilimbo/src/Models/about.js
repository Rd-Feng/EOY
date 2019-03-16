import React, { Component } from "react";
import './styles/about.css';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScroll: false
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll() {
    if (window.pageYOffset > 500) {
      this.setState({ isScroll: true })
    }
    else {
      this.setState({ isScroll: false })
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
        <div className="about-component">
            <div className="developers"> Developers </div>
            <div className="meet-the-team">
                <div className={(this.state.isScroll) ? "team-card-animated" : "team-card"}>
                    Sumin Yu
                    <img src={require('./team/sumin.jpg')}/>
                </div>
                <div className={(this.state.isScroll) ? "team-card-animated" : "team-card"}>
                    Rui Feng
                    <img src={require('./team/rui.JPG')}/>
                </div>
                <div className={(this.state.isScroll) ? "team-card-animated" : "team-card"}>
                    Jian Huang
                    <img src={require('./team/jian.png')}/>
                </div>
            </div>
            <div className="app-description">
                This application was created with the intent of bringing developers together by offering a common topic of discussion. Here at Limbo, we believe less is more. Users will be given a popular article sourced from HackerNews. From there, users can choose to read, comment, and connect with other users to expand their professional network. Enjoy.
            </div>
        </div>
    )
  }
}

export default About;
