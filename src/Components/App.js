import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import theme from "../Styles/Theme";
import Router from "./Router";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router isLoggedIn={false} />
    </ThemeProvider>
  );
};

export default App;
