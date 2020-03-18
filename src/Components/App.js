import React, { Component } from 'react';

import logo from '../logo.svg';

import '../css/App.css';

import { Chimes } from './Chimes';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />  

          <div className="chime-wrapper">
            <Chimes />
          </div>

        </header>
      </div>
    );
  }
}

export default App;
