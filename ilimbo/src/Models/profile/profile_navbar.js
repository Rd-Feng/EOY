import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';


class ProfileNavbar extends Component {
  render() {
    return (
      <GoogleLogout
        buttonText="Logout"
        render={renderProps => (
          <button onClick={() => console.log('trying to log out')}>Logout</button>
        )}
        clientId="959614478231-rhsbohn77k2664h64phq1v128lqp78l9.apps.googleusercontent.com"
        buttonText="Logout"
      />
    )
  }
}

export default withRouter(ProfileNavbar);
