import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <About to={`/about`}>About</About>
      <Faq to={`/faq`}>FAQ</Faq>
    </Container>
  )
}

const Container = styled.div` 
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const About = styled(NavLink)` 
  font-size: 18px;
  font-weight: 400;
  border: 1px solid black;
  border-radius: 3px;
  margin: 100px;
  padding: 10px 20px;
  color: black;
  text-decoration: none;
  transition: 0.4s;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Faq = styled(NavLink)`
  font-size: 18px;
  font-weight: 400;
  border: 1px solid black;
  border-radius: 3px;
  margin: 100px;
  padding: 10px 20px;
  color: black;
  text-decoration: none;
  transition: 0.4s;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export default Footer;
