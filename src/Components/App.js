import React from "react";
import gql from "graphql-tag";
//import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import theme from "../Styles/Theme";
import Routes from "./Routes";
import { useQuery } from "react-apollo-hooks";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import { HashRouter as Router } from "react-router-dom";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;
`;

const App = () => {
  const { data } = useQuery(QUERY);
  console.log(data);
  //console.log(isLoggedIn);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        {data?.isLoggedIn && <Header />}
        <Wrapper>
          <Routes isLoggedIn={data?.isLoggedIn} />
          <Footer />
          <ToastContainer
            position={toast.POSITION.TOP_CENTER}
            closeButton={true}
            autoClose={3000}
          />
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
