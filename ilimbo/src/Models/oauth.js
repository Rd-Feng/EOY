import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from 'react-google-login';
import {withRouter} from 'react-router-dom';


class OAuth extends Component {
  render() {
    const responseGoogle = (response) => {
      if (response.error) {
        return;
      }
      fetch(process.env.REACT_APP_API + '/verify', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: response.getAuthResponse().id_token
        })
      })
        .then(response => response.json())
        .then(response => {
          localStorage.setItem("id_token", JSON.stringify(response.id));
          localStorage.setItem("ImgUrl", JSON.stringify(response.img_url));
          localStorage.setItem("Fullname", JSON.stringify(response.first_name + ' ' + response.last_name));
          this.props.history.push('/home');
        })
    }
    if (localStorage.getItem('id_token')) {
      return (
        // <a onClick={() => {localStorage.clear(); this.props.history.push('/')}}>Logout</a>
        <GoogleLogout
          buttonText="Logout"
          onSuccess={() => {localStorage.clear(); this.props.history.push('/'); console.log('success logout')}}
          onFailure={() => {localStorage.clear(); this.props.history.push('/'); console.log('failed logout')}}
        ></GoogleLogout>
      )
    }
    return (
      <GoogleLogin
        clientId="447724909836-ip4833mlicofoka8gaukf2ohm3tqacu0.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    )
  }
}

export default withRouter(OAuth);
