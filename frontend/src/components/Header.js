import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Container>
      <MenuItem>About</MenuItem>
      <MenuItem>FAQ</MenuItem>
      <MenuItemLink to={`/`}>Home</MenuItemLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;
  width: 100%;
  background-color: black;
  margin: 0px;
  padding: 0px;
  z-index: 5;
`;

const MenuItem = styled.p`
  color: white;
  font-size: 24px;
  font-weight: 500;
  margin: 0px 25px;
  font-family: "Montserrat", sans-serif;
  color: white;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    font-size: 26px;
  }
`;

const MenuItemLink = styled(NavLink)`
  color: white;
  font-size: 24px;
  font-weight: 500;
  margin: 0px 25px;
  font-family: "Montserrat", sans-serif;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    font-size: 26px;
  }
`;

export default Header;
