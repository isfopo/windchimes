import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Chimes } from './Chimes';

export const App = props => {

  const [theme, setTheme] = useState(props.theme)

  useEffect (() => {
    setTheme(props.theme)
  }, [props.theme])

  return (
    <div className="App">
      <Router>
        <div className="chime-wrapper">
          <Route 
            exact path='/' 
            render = { props => 
              <Chimes 
                  theme = {theme}
                  {...props}
                />
              }
            />
          <Route 
            path='/:notes'
            render = { props => 
              <Chimes 
                  theme = { theme }
                  {...props}
                />
              }
            />
        </div>
      </Router>

    </div>
  );
}


export default App;
