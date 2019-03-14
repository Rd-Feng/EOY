import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Models/landing_page'


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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
