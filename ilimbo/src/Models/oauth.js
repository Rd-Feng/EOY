import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';


class OAuth extends Component {
  render() {
    const responseGoogle = (response) => {
      let profile = response.getBasicProfile();
      console.log(response.getAuthResponse().id_token);
      localStorage.setItem("id_token", JSON.stringify(response.getAuthResponse().id_token));
      localStorage.setItem("ImgUrl", JSON.stringify(profile.getImageUrl()));
      localStorage.setItem("Fullname", JSON.stringify(profile.getName()));
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
