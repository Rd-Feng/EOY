import React, { Component } from 'react'
import Oauth from '../oauth'
import '../styles/landing_navbar.css'
import ResNavbar from './res_navbar'
import { withRouter } from 'react-router-dom';


class Navbar extends Component {
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
  handleLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }
  handleBookmark() {
    this.props.history.push('/bookmark');
  }
  handleProfile() {
    let url =
      this.props.history.push('/profile/' + JSON.parse(localStorage.getItem("id_token")))
  }
  handleHome() {
    this.props.history.push('/home');
  }
  render() {
    return (
      <div>
        <nav className={(this.state.isScroll) ? 'navbar navbar-custom navbar-fixed-top top-nav-collapse' : 'navbar navbar-custom navbar-fixed-top'} role="navigation">
          <div className="navbar-container">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                <h1>!Limbo</h1>
              </a>
            </div>

            <div className="header_button" onClick={this.toggleHidden.bind(this)} >
              <h1>&#9776;</h1></div>{!this.state.isHidden && <ResNavbar />}
            <div className="collapse navbar-collapse">
              <ul className={(this.state.isScroll) ? 'nav navbar-nav navbar-text-color' : 'nav navbar-nav navbar-nav-bg'}>
                {localStorage.getItem('id_token') && <li className="active"><a onClick={() => this.handleHome()}>Home</a></li>}
                {localStorage.getItem('id_token') && <li><a href={'http://localhost:3000/profile/' + JSON.parse(localStorage.getItem("id_token"))}>Profile</a></li>}
                {localStorage.getItem('id_token') && <li><a href='http://localhost:3000/bookmark'>Bookmark</a></li>}
                <li><Oauth /></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Navbar);
