import React, { Component } from 'react'
import HomeHeader from '../home/header'
import './styles/profile.css'
import Bookmark from '../bookmark'
import Connection from './connection'
import ConnectionBtn from './connection_button'
import Followers from './followers'


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFollw: true,
      showFollower: false,
      showBookmark: false,
      follow_color: { 'backgroundColor': '#cce6ff', 'color': 'black'},
      follower_color: {},
      bookmark_color: {}
    }
  }
  componentDidMount() {
    let myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    let myInit = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(process.env.REACT_APP_API + '/user/' + this.props.location.pathname.split("/")[2], myInit)
      .then(response => response.json())
      .then(response => {
        this.setState({
          user_firstname: response.data[0].first_name,
          user_lastname: response.data[0].last_name,
          user_img: response.data[0].img_url,
          user_emal: response.data[0].email,
          user_github: response.data[0].github,
          user_id: response.data[0].id,
          user_linkedin: response.data[0].linkedin,
          user_twitter: response.data[0].twitter
        });
      })
      .then(response => {
        let myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');
        let myInit = {
          method: 'GET',
          headers: myHeaders,
        };
        fetch(process.env.REACT_APP_API + '/connections/' + this.props.location.pathname.split("/")[2], myInit)
          .then(response => response.json())
          .then(response => {
            this.setState({ connection_count: response.data.length, connection: response.data });
          });
        fetch(process.env.REACT_APP_API + '/connections/followers/' + this.props.location.pathname.split("/")[2], myInit)
          .then(response => response.json())
          .then(response => {
            this.setState({ follower_count: response.data.length, follower: response.data });
          });
      })
  }

  handleFollow() {
    this.setState({ showFollw: true, showFollower: false, showBookmark: false, bookmark_color: {}, follower_color: {}, follow_color: { 'backgroundColor': '#cce6ff', 'color': 'black' } })
  }
  handleFollower() {
    this.setState({ showFollw: false, showFollower: true, showBookmark: false, bookmark_color: {}, follow_color: {}, follower_color: { 'backgroundColor': '#cce6ff', 'color': 'black' } })
  }
  handleBookMark() {
    this.setState({ showFollw: false, showBookmark: true, showFollower: false, follow_color: {}, follower_color: {}, bookmark_color: { 'backgroundColor': '#b3ccff', 'color': 'black' } })
  }
  render() {
    return (
      <div >
        <HomeHeader />
        <div className="profile_header">
          {JSON.parse(localStorage.getItem("id_token")) === this.props.match.params.user_id && <button className="edit_btn" onClick={() => this.props.history.push('/profile/edit/' + this.props.match.params.user_id)}>&#x2710; Edit Profile</button>}
          <div className="follow_btn"> <ConnectionBtn profile_id={this.props.match.params.user_id}/></div>
          <div className="profile_name">
            <div>{this.state.user_firstname} {this.state.user_lastname}</div>
            <div className="profile_email">&#x2709; {this.state.user_emal}</div>
          </div>

        </div>
        <div className="profile_info_container">
          <div className="profile_info_left">
            <button style={this.state.follow_color} onClick={() => { this.handleFollow(); }}>{this.state.connection_count} Following</button>
            <button style={this.state.follower_color} onClick={() => { this.handleFollower(); }}>{this.state.follower_count} Followers</button>
            <button style={this.state.bookmark_color} onClick={() => { this.handleBookMark(); }}>Bookmark</button>
          </div>
          <img className="profile_user_img" src={this.state.user_img}></img>
          <div className="profile_info_right">
            {this.state.user_github && <a href={this.state.user_github} target="_blank" rel="noopener noreferrer">
              <img alt="github" src={require(`../images/github.png`)} />
            </a>}
            {this.state.user_linkedin && <a href={this.state.user_linkedin} target="_blank" rel="noopener noreferrer">
              <img alt="linkedin" src={require(`../images/linkedin.png`)} />
            </a>}
            {this.state.user_twitter && <a href={this.state.user_twitter} target="_blank" rel="noopener noreferrer">
              <img alt="twitter" src={require(`../images/twitter.png`)} />
            </a>}
          </div>
        </div>
        <div className="profile_content_container">
          {this.state.showFollw && <div className="profile_follow"><Connection /> </div>}
          {this.state.showFollower && <div className="profile_follow"><Followers /> </div>}
          {this.state.showBookmark && <div className="profile_bookmark"><Bookmark user_id={this.props.match.params.user_id}/></div>}
        </div>
      </div>
    )
  }
}

export default Profile;
