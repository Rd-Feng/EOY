import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Models/landing_page'
import Profile from './Models/profile/profile'
import Bookmark from './Models/bookmark'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Route exact={true} path='/' component={Landing} />
	  <Route exact={true} path='/bookmark' component={Bookmark} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
