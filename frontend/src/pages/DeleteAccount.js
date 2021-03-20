import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
 
const DeleteAccount = () => {
  return (
    <Container>
      <Text>Your account has been deleted.</Text>
      <HomeLink to={`/`}>Return to the homepage</HomeLink>
    </Container>
  )
}

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Text = styled.p` 
  font-size: 24px;
  font-weight: 600;
`;

const HomeLink = styled(NavLink)` 
  text-decoration: none;
  color: black;
  font-size: 24px;
  font-weight: 600;
`

export default DeleteAccount;
