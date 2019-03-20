import React, { Component } from 'react'
import HomeHeader from '../home/header'
import './styles/profile.css'


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    fetch('http://localhost:4000/user/' + this.props.location.pathname.split("/")[2])
      .then(response => response.json())
      .then(response => {
        console.log(response.data[0])
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
        fetch('http://localhost:4000/connections/' + this.props.location.pathname.split("/")[2])
          .then(response => response.json())
          .then(response => {
            this.setState({ connection_count: response.data.length, connection: response.data });
          });
      })
  }

  render() {
    console.log(this.state.user_info)
    return (
      <div >
        <HomeHeader />
        <div className="profile_header">
        {JSON.parse(localStorage.getItem("id_token")) === this.props.location.pathname.split("/")[2] && <button>&#x2710; Edit Profile</button>}
          <div className="profile_name">
            {this.state.user_firstname} {this.state.user_lastname}
          </div>

        </div>
        <div className="profile_info_container">
          <div className="profile_info_left">
            <p>{this.state.connection_count} Following</p>
            <button>+ Follow</button>
          </div>
          <img className="profile_user_img" src={this.state.user_img}></img>
          <div className="profile_info_right">
            {this.state.user_github && <a href={this.state.user_github}>
              <img alt="github" src={require(`../images/github.png`)} />
            </a>}
            {this.state.user_linkedin && <a href={this.state.user_linkedin}>
              <img alt="linkedin" src={require(`../images/linkedin.png`)} />
            </a>}
            {this.state.user_twitter && <a href={this.state.user_twitter}>
              <img alt="twitter" src={require(`../images/twitter.png`)} />
            </a>}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
