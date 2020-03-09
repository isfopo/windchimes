import React, { Component } from 'react';

import logo from '../logo.svg';

import '../css/App.css';

import Chimes from './Chimes';

class App extends Component {

  state = {
    chimeNotes: []
  }

  addChime = () => {
    const array = [...this.state.chimeNotes].push(prompt("Please enter a note").toUpperCase());
    
    this.setState({
        chimeNotes: array
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />  

          <div className="chime-wrapper">
            <Chimes 
              chimeNotes={this.state.chimeNotes}
              addChime={this.addChime}
            />
          </div>

        </header>
      </div>
    );
  }
}

export default App;
