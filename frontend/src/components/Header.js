import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { NavLink } from "react-router-dom";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const Header = () => {
  return (
    <Container>
      <SearchBar />
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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 60px;
  width: 100%;
  background-color: black;
  ${onTabletMediaQuery()} {
    height: 50px;
  }
  ${onSmallPhoneMediaQuery()} {
    height: 50px;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 25%;
  margin-left: 5%;
  ${onDesktopMediaQuery()} {
    margin-right: 5%;
  }
  ${onTabletMediaQuery()} {
    width: 35%;
  }
  ${onSmallPhoneMediaQuery()} {
    margin-right: 10%;
    width: 50%;
  }
`;

const MenuItemLink = styled(NavLink)`
  color: white;
  font-size: 24px;
  font-weight: 500;
  margin: 10px 20px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  ${onTabletMediaQuery()} {
    font-size: 20px;
    margin: 5px 10px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 16px;
    margin: 10px 5px;
  }
`;

export default Header;
