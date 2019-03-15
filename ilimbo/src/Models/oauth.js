import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';


class OAuth extends Component {
  render() {
    const responseGoogle = (response) => {
      console.log(response.getAuthResponse().id_token);
    }
    return (
      <GoogleLogin
        clientId="959614478231-rhsbohn77k2664h64phq1v128lqp78l9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    )
  }
}

export default OAuth;
