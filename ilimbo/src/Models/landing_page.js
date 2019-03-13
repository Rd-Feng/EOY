import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';


class Landing extends Component {
  render() {
    const responseGoogle = (response) => {
      console.log(response);
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

export default Landing;