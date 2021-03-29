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
  width: 100vw;
  background-color: black;
  margin: 0px;
  padding: 0px;
  ${onDesktopMediaQuery()} {
    height: 60px;
  }
  ${onTabletMediaQuery()} {
    height: 50px;
  }
  ${onSmallPhoneMediaQuery()} {
    height: 45px;
  }
`;

const MenuItem = styled.p`
  color: white;
  font-size: 24px;
  font-weight: 500;
  margin: 0px 25px;
  font-family: "Montserrat", sans-serif;
  color: white;
  cursor: pointer;
  ${onTabletMediaQuery()} {
    font-size: 20px;
    margin: 0px 15px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 18px;
    margin: 0px 10px;
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
  ${onTabletMediaQuery()} {
    font-size: 20px;
    margin: 0px 15px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 18px;
    margin: 0px 10px;
  }
`;

export default Header;
