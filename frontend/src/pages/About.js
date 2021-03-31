import React from "react";
import styled from "styled-components";
import Header from "../components/Header";

const About = () => {
  return (
    <Container>
      <Header />
      <AboutWrapper>
        <Title>About This Site</Title>
        <DescriptionDiv>
          <Text>
            <p>
              This website was inspired by challenges interacting with
              Montreal's healthcare system.
            </p>
            <p>
              While the city offers many great services, finding a family doctor
              is a notoriously lengthy and difficult process.
            </p>
            <p>
              Hopefully this resource will allow people to find suitable medical
              care with more ease by identifying the capacity of different
              clinics and doctors, while also giving those medical professionals
              the opportunity to display key information to the public.
            </p>
          </Text>
        </DescriptionDiv>
      </AboutWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #085b67;
  overflow-y: scroll;
`;

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const DescriptionDiv = styled.div`
  background-color: white;
  width: 80%;
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
  margin-bottom: 20px;
`;

const Text = styled.p`
  text-align: center;
  line-height: 30px;
  font-size: 20px;
`;

export default About;
