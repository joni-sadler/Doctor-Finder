import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home";
import About from "./About";
import Faq from "./Faq";
import ProviderPage from "./ProviderPage";
import HealthcareFinder from "./HealthcareFinder";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/faq">
            <Faq />
          </Route>
          <Route exact path="/providerlogin">
            <ProviderPage />
          </Route>
          <Route exact path="/healthcarefinder">
            <HealthcareFinder />
          </Route>
        </Switch>
      </Main>
    </BrowserRouter>
  );
}

const Main = styled.div` 
  display: flex;
  height: 60vw;
`;

export default App;
