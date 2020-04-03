import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import { Chimes } from './Chimes';

export const App = () => {

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <BrowserRouter>
        <div className="chime-wrapper">
          <Route exact path='/' component={Chimes} />
          <Route path='/:notes' component={Chimes} />
        </div>
      </BrowserRouter>

    </div>
  );
}


export default App;
