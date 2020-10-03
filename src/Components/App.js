import React from "react";
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import theme from "../Styles/Theme";
import Router from "./Router";
import { useQuery } from "react-apollo-hooks";
import Footer from "./Footer";
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  max-width: 935px;
  width: 100%;
  margin: 0 auto;
`;

const App = () => {
  const {
    data: { isLoggedIn },
    error,
    loading,
  } = useQuery(QUERY);
  console.log(isLoggedIn);
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <GlobalStyles />
        <Router isLoggedIn={isLoggedIn} />
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
