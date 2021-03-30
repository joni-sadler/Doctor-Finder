import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Map from "../components/Map";
import Header from "../components/Header";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const FamilyDoctor = () => {
  const [acceptingPatients, setAcceptingPatients] = useState([]);

  useEffect(() => {
    fetch(`/doctor_finder`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setAcceptingPatients(res.data));
  }, []);

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <MenuWrapper>
          <MenuText>Clinics with doctors accepting new patients:</MenuText>
          {acceptingPatients.map((acceptingPatients) => {
            return (
              <ListItem
                to={`/clinics/${acceptingPatients._id}`}
                key={acceptingPatients._id}
              >
                {acceptingPatients.clinicName}
              </ListItem>
            );
          })}
        </MenuWrapper>
        <MapWrapper>
          <Map acceptingPatients={acceptingPatients} />
        </MapWrapper>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #085b67;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 90%;
  ${onDesktopMediaQuery()} {
    flex-direction: column;
    justify-content: flex-start;
  }
  ${onTabletMediaQuery()} {
    flex-direction: column;
    height: 100%;
  }
  ${onSmallPhoneMediaQuery()} {
    flex-direction: column;
    height: 100%;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const MenuText = styled.p`
  font-size: 24px;
  font-weight: 600;
  padding: 0px 20px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 80%;
  margin: 20px;
  ${onDesktopMediaQuery()} {
    height: 100%;
    width: 90%;
    margin: 5%;
  }
  ${onTabletMediaQuery()} {
    height: 100%;
    width: 90%;
    margin: 5%;
  }
  ${onSmallPhoneMediaQuery()} {
    height: 100%;
    width: 90%;
    margin: 5%;
  }
`;

const ListItem = styled(NavLink)`
  font-size: 16px;
  font-weight: 600;
  padding: 0px 10px;
  margin: 10px 20px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  text-decoration: none;
  cursor: pointer;
`;

export default FamilyDoctor;
