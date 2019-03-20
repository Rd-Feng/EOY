import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Models/landing_page'
import Profile from './Models/profile/profile'
import Home from './Models/home/home'
import Bookmark from './Models/bookmark'
import Connection from './Models/profile/connection'
import History from './Models/history'
import ProfileEdit from './Models/profile/profile_edit'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Route exact={true} path='/' component={Landing} />
          <Route exact={true} path='/home' component={Home} />
          <Route exact={true} path='/bookmark' component={Bookmark} />
          <Route exact={true} path='/connection' component={Connection} />
          <Route exact={true} path='/profile/:user_id' component={Profile} />
          <Route exact={true} path='/profile/edit/:user_id' component={ProfileEdit} />
          <Route exact={true} path='/history/:item_id' component={History} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
