import React, { Component } from 'react'
import Oauth from './oauth'
import './styles/landing_navbar.css'
import LandingResNavbar from './landing_responsive_navbar'


class LandingNavbar extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      isScroll: false,
      isHidden: true
    }
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
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
            <div  className="navbar-header">
              <a className="navbar-brand" href="/">
                <h1>!Limbo</h1>
              </a>
            </div>

            <div className="header_button" onClick={this.toggleHidden.bind(this)} >
        <h1>&#9776;</h1></div>{!this.state.isHidden &&  <LandingResNavbar/>}
             <div className="collapse navbar-collapse">
              <ul className={(this.state.isScroll) ? 'nav navbar-nav navbar-text-color' : 'nav navbar-nav navbar-nav-bg'}>
                <li className="active">
                <a onClick={() => document.getElementById("intro").scrollIntoView()}>Home</a></li>
                <li><a onClick={() => document.getElementById("about").scrollIntoView()}>About</a></li>
                <li><a onClick={() => document.getElementById("article").scrollIntoView()}>Article</a></li>
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
