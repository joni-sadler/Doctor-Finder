import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const Home = () => {
  return (
    <Container>
      <Header />

      <ContentWrapper>
        <Title>Navigating Montreal's Healthcare System</Title>
        <SubheaderText>
          Many Montrealers do not have a family doctor and experience difficulty
          finding appropriate care when they need it. We’re trying to make
          things easier.
        </SubheaderText>
        <MenuDiv>
          <Patient to={`/healthcare_finder`}>I'm seeking healthcare</Patient>
          <Provider to={`/login`}>I'm a healthcare provider</Provider>
        </MenuDiv>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: auto;
  padding-left: 50px;
  background-color: #085b67;
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.p`
  font-size: 60px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 100px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const SubheaderText = styled.p`
  font-size: 24px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const Patient = styled(NavLink)`
  margin: 50px 0px 25px 25px;
  text-decoration: none;
  font-size: 36px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  transition: 0.2s;
  &:hover {
    font-size: 38px;
  }
`;

const Provider = styled(NavLink)`
  margin: 25px 0px 25px 25px;
  text-decoration: none;
  font-size: 36px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  transition: 0.2s;
  &:hover {
    font-size: 38px;
  }
`;

export default Home;
