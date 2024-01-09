import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";

import { App } from "./App";
import { themes } from "../resources/themes";

const useStyles = createUseStyles({
  wrapper: {
    text: ({ theme }) => theme.background2,
    background: ({ theme }) => theme.background2,
    borderColor: ({ theme }) => theme.foreground,
    width: "100%",
  },
});

export const ChangeThemeContext = React.createContext(undefined);

export const Body = () => {
  const [theme, setTheme] = useState(themes.metal);
  const classes = useStyles({ theme });

  const changeTheme = (newTheme) => {
    setTheme(themes[newTheme]);
  };

  useEffect(() => {
    document.body.style.background = theme.background2;
  }, [theme]);

  return (
    <ChangeThemeContext.Provider value={changeTheme}>
      <div className={classes.wrapper}>
        <App theme={theme} changeTheme={changeTheme} />
      </div>
    </ChangeThemeContext.Provider>
  );
};
