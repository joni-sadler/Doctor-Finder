import React from "react";
import styled from "styled-components";
import Header from "../components/Header";

const Faq = () => {
  return (
    <Container>
      <Header />
      <FaqWrapper>
        <Title>Frequently Asked Questions</Title>
        <DescriptionDiv>
          <Question>What is this site?</Question>
          <Text>
            This site is a resource to help ordinary people navigate Montreal's
            healthcare system.
          </Text>
          <Question>Are the doctors real?</Question>
          <Text>
            No. Each doctor featured on this website is drawn from popular
            fiction. This is simply to demonstrate site functionality. In an
            ideal world, clinics and doctors would use a tool like this to help
            communicate with their patients (and potential patients) in a more
            effective capacity.
          </Text>
          <Question>Are the clinics real?</Question>
          <Text>
            Yes, each clinic on this site is a real place. I have attempted to
            document their working hours and contact info where possible, but
            please do verify all information you see on this site before
            reaching out to any of these clinics!
          </Text>
          <Emergency>If you are seriously injured, call 911</Emergency>
        </DescriptionDiv>
      </FaqWrapper>
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #085b67;
  overflow-y: scroll;
`;

const FaqWrapper = styled.div`
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
  text-align: center;
`;

const DescriptionDiv = styled.div`
  background-color: white;
  width: 80%;
  height: 80%;
  overflow-y: scroll;
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
  margin-bottom: 20px;
`;

const Question = styled.p`
  text-align: center;
  line-height: 30px;
  font-size: 22px;
  font-weight: 600;
  padding: 10px 0px 0px 0px;
`;

const Text = styled.p`
  text-align: center;
  line-height: 22px;
  font-size: 18px;
  margin-top: 0px;
  padding-top: 0px;
`;

const Emergency = styled.p`
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  padding: 10px;
`;

export default Faq;
