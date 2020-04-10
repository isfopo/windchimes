import React, { useState, useEffect } from 'react';
import { createUseStyles } from "react-jss";

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Chimes } from './Chimes';

const useStyles =  createUseStyles({
  wrapper: {
      background: ({ theme }) => theme.highlight1,
      borderRadius: "3%"
  }
})

export const App = props => {

  const [theme, setTheme] = useState(props.theme)

  const classes = useStyles ({ theme })

  useEffect (() => {
    setTheme(props.theme)
  }, [props.theme])

  return (
    <div className={`${classes.wrapper} App`}>
      <Router>
        <div className="chime-wrapper">
          <Route 
            exact path='/' 
            render = { props => 
              <Chimes 
                  theme = { theme }
                  { ...props }
                />
              }
            />
          <Route 
            path='/:notes'
            render = { props => 
              <Chimes 
                  theme = { theme }
                  { ...props }
                />
              }
            />
        </div>
      </Router>

    </div>
  );
}


export default App;
