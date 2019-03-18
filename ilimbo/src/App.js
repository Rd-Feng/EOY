import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Models/landing_page'
import Profile from './Models/profile/profile'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Route exact={true} path='/' render={() => (
              <div>
                  <div className="content">
                      <Landing  />
                  </div>
              </div>
          )} />
          <Route exact={true} path='/profile/:id' component={Profile} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
