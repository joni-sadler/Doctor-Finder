import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const DeleteAccount = () => {
  return (
    <Container>
      <Text>Your account has been deleted.</Text>
      <HomeLinkButton>
        <HomeLink to={`/`}>Return to the homepage</HomeLink>
      </HomeLinkButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #085b67;
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const HomeLinkButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 3px;
  padding: 5px;
  font-size: 30px;
  font-weight: 500;
  cursor: pointer;
`;

const HomeLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 24px;
  font-weight: 600;
  padding: 10px;
  text-shadow: 1px 1px 1px #000000;
`;

export default DeleteAccount;
