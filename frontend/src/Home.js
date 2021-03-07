import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";

const Home = () => {
  return (
    <Container>
      <Title>Navigating Montreal's Health System</Title>
      <MenuDiv>
        <Patient to={`/healthcarefinder`}>
          I'm seeking healthcare
        </Patient>
        <Provider to={`providerlogin`}>
          I'm a healthcare provider
        </Provider>
      </MenuDiv>
      <FooterDiv>
        <Footer />  
      </FooterDiv>
    </Container>
  )
};

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;
  border-radius: 3px;
  height: 100%;
  width: 100%;
`;

const MenuDiv = styled.div` 
  display: flex;
  justify-content: space-around;
`;

const Title = styled.p` 
  font-size: 60px;
  font-weight: 700;
  margin-top: 100px;
`;

const Patient = styled(NavLink)`     
  border-radius: 3px;
  margin: 0px 50px;
  padding: 10px 20px;
  text-decoration: none;
  color: black;
  font-size: 32px;
  font-weight: 600;
  transition: 0.2s;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Provider = styled(NavLink)` 
  border-radius: 3px;
  margin: 0px 50px;
  padding: 10px 20px;
  text-decoration: none;
  color: black;
  font-size: 28px;
  font-weight: 600;
  transition: 0.4s;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const FooterDiv = styled.div` 
  /* border: 1px solid orange; */
`;

export default Home;