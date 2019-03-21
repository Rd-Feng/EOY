import React, { Component } from 'react'
import '../styles/landing_responsive_navbar.css'
import { withRouter } from 'react-router-dom';
import Oauth from '../oauth';


class ResNavbar extends Component {
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
      <div className="res_collapse res_navbar-collapse">
        <ul className='res_nav res_navbar-nav res_navbar-text-color'>
          <li className="res_active">
            <a onClick={() => this.handleHome()}>Home</a></li>
          {localStorage.getItem('id_token') && <li><a onClick={() => this.handleProfile()}>Profile</a></li>}
          {localStorage.getItem('id_token') && <li><a onClick={() => this.handleBookmark()}>Bookmark</a></li>}
          <li><Oauth /></li>
        </ul>
      </div>
    )
  }
}

export default withRouter(ResNavbar);
