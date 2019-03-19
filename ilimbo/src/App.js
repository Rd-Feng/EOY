import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Models/landing_page'
import Profile from './Models/profile/profile'
import Home from './Models/home/home'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Route exact={true} path='/' component={Landing} />
          <Route exact={true} path='/home' component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
