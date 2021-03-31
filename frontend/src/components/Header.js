import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const Header = () => {
  return (
    <Container>
      <MenuWrapper>
        <MenuItemLink to={`/about`}>About</MenuItemLink>
        <MenuItemLink to={`/faq`}>FAQ</MenuItemLink>
        <MenuItemLink to={`/`}>Home</MenuItemLink>
      </MenuWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: 60px;
  min-width: 100vw;
  background-color: black;
  margin: 0px;
  padding: 0px;
  ${onDesktopMediaQuery()} {
    min-height: 60px;
  }
  ${onTabletMediaQuery()} {
    min-height: 50px;
  }
  ${onSmallPhoneMediaQuery()} {
    min-height: 45px;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20%;
  margin-right: 5%;
  ${onDesktopMediaQuery()} {
    margin-right: 10%;
  }
  ${onTabletMediaQuery()} {
    margin-right: 15%;
  }
  ${onSmallPhoneMediaQuery()} {
    margin-right: 17%;
  }
`;

const MenuItemLink = styled(NavLink)`
  color: white;
  font-size: 24px;
  font-weight: 500;
  margin: 10px 40px 10px 25px;
  font-family: "Montserrat", sans-serif;
  color: white;
  text-decoration: none;
  cursor: pointer;
  ${onTabletMediaQuery()} {
    font-size: 20px;
    margin: 5px 0px 5px 10px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 18px;
    margin: 10px 10px;
  }
`;

export default Header;
