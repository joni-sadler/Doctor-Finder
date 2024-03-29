import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const Home = () => {
  const [displayProviderDropdown, setDisplayProviderDropdown] = useState(false);
  const [displayHealthcareDropdown, setDisplayHealthcareDropdown] = useState(
    false
  );

  // Dropdown menu that displays options for those seeking healthcare
  const handleProviderDropdown = () => {
    setDisplayProviderDropdown(!displayProviderDropdown);
    setDisplayHealthcareDropdown(false);
  };

  // Dropdown menu that displays options for doctors and clinic administrators
  const handleSeekingHealthcareDropdown = () => {
    setDisplayHealthcareDropdown(!displayHealthcareDropdown);
    setDisplayProviderDropdown(false);
  };

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Title>Navigating Montreal's Healthcare System</Title>
        <SubheaderText>
          Many Montrealers do not have a family doctor and experience difficulty
          finding appropriate care when they need it. We’re trying to make
          things easier.
        </SubheaderText>
        <MenuDiv>
          <PatientContainer>
            <Patient onClick={handleSeekingHealthcareDropdown}>
              I'm seeking healthcare
            </Patient>
          </PatientContainer>
          {displayHealthcareDropdown && (
            <DropdownContainer>
              <DropdownText to={`/doctor_finder`}>
                Find a family doctor
              </DropdownText>
              <DropdownText to={`/walk_in_clinics`}>
                Find a walk-in clinic
              </DropdownText>
              <DropdownText to={`/clinic_appointments`}>
                Find a clinic that accepts appointments
              </DropdownText>
              <DropdownText to={`/doctors`}>
                See all doctors in my area
              </DropdownText>
              <DropdownText to={`/clinics`}>
                See all clinics in my area
              </DropdownText>
            </DropdownContainer>
          )}
          <Provider onClick={handleProviderDropdown}>
            <ProviderText>I'm a healthcare provider</ProviderText>
          </Provider>
          {displayProviderDropdown && (
            <DropdownContainer>
              <DropdownText to={`/doctor_login`}>Doctor Login</DropdownText>
              <DropdownText to={`/doctor_signup`}>Doctor Signup</DropdownText>
              <DropdownText to={`/clinic_login`}>Clinic Login</DropdownText>
              <DropdownText to={`/clinic_signup`}>Clinic Signup</DropdownText>
            </DropdownContainer>
          )}
        </MenuDiv>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #085b67;
  overflow: auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 50px;
  width: 100vw;
  height: 100vh;
  ${onDesktopMediaQuery()} {
    padding-left: 35px;
    width: 100vw;
    height: 100vh;
  }
  ${onTabletMediaQuery()} {
    padding-left: 25px;
    width: 100vw;
    height: 100vh;
  }
  ${onSmallPhoneMediaQuery()} {
    padding-left: 15px;
    width: 100vw;
    height: 100vh;
  }
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.p`
  font-size: 60px;
  font-weight: 700;
  margin: 100px 30px 50px 0px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  ${onTabletMediaQuery()} {
    font-size: 50px;
    margin-top: 70px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 50px;
    margin-top: 50px;
  }
`;

const SubheaderText = styled.p`
  width: 90%;
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
  margin: 0px 0px 50px 0px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const PatientContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 3px;
  margin-bottom: 25px;
  height: 50%;
  width: 40%;
  ${onDesktopMediaQuery()} {
    width: 50%;
  }
  ${onTabletMediaQuery()} {
    width: 60%;
  }
  ${onSmallPhoneMediaQuery()} {
    width: 90%;
  }
`;

const Patient = styled.div`
  margin: 8px 0px;
  padding: 5px;
  text-decoration: none;
  font-size: 40px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  ${onTabletMediaQuery()} {
    font-size: 35px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 30px;
  }
`;

const Provider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 3px;
  margin-bottom: 25px;
  height: 50%;
  width: 40%;
  ${onDesktopMediaQuery()} {
    width: 50%;
  }
  ${onTabletMediaQuery()} {
    width: 60%;
  }
  ${onSmallPhoneMediaQuery()} {
    width: 90%;
  }
`;

const ProviderText = styled.p`
  margin: 8px 0px;
  padding: 10px;
  text-decoration: none;
  text-align: center;
  font-size: 40px;
  font-weight: 600;
  color: white;
  transition: 0.2s;
  cursor: pointer;
  ${onTabletMediaQuery()} {
    font-size: 35px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 30px;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0px 0px 50px 50px;
  width: auto;
  ${onTabletMediaQuery()} {
    margin: 0px 0px 25px 25px;
  }
  ${onSmallPhoneMediaQuery()} {
    margin: 0px 0px 25px 10px;
  }
`;

const DropdownText = styled(NavLink)`
  color: white;
  font-size: 24px;
  font-weight: 500;
  margin: 10px 0px;
  padding: 0px;
  text-decoration: none;
  text-shadow: 1px 1px 1px #000000;
  &:hover {
    cursor: pointer;
    color: #bbc6c7;
  }
  ${onTabletMediaQuery()} {
    margin: 0px 0px 25px 25px;
  }
  ${onSmallPhoneMediaQuery()} {
    margin: 0px 0px 25px 10px;
  }
`;

export default Home;
