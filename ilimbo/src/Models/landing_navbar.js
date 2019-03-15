import React, { Component } from 'react'
import Oauth from './oauth'
import './styles/landing_navbar.css'


class LandingNavbar extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      isScroll: false
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  };
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll() {
    if (window.pageYOffset > 50) {
      this.setState({ isScroll: true })
    }
    else {
      this.setState({ isScroll: false })
    }
  }
  render() {
    return (
      <div>
        <nav className={(this.state.isScroll) ? 'navbar navbar-custom navbar-fixed-top top-nav-collapse' : 'navbar navbar-custom navbar-fixed-top'} role="navigation">
          <div className="navbar-container">
            <div className="navbar-header page-scroll">
              <a className="navbar-brand" href="/">
                <h1>Limbo</h1>
              </a>
            </div>


            <div className="collapse navbar-collapse navbar-main-collapse">
              <ul className={(this.state.isScroll) ? 'nav navbar-nav navbar-text-color' : 'nav navbar-nav navbar-nav-bg'}>
                <li className="active"><a href="#intro">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#service">Article</a></li>
                <li><Oauth /></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default LandingNavbar;