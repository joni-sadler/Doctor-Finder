import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Map from "../components/Map";

const HealthcareFinder = () => {
  return (
    <Container>
      <MenuWrapper>
        <Intro>I want to...</Intro>
        <ListItem to={`/doctor_finder`}>Find a family doctor</ListItem>
        <ListItem to={`/walk_in_clinics`}>Find a walk-in clinic</ListItem>
        <ListItem to={`/clinic_appointments`}>Find a clinic that accepts appointments</ListItem>
        <ListItem to={`/doctors`}>See all doctors in my area</ListItem>
        <ListItem to={`/clinics`}>See all clinics in my area</ListItem>
      </MenuWrapper>
      <MapWrapper>
        <Map />
      </MapWrapper>
    </Container>
  )
}

const Container = styled.div` 
  display: flex;
  justify-content: space-between;
  border: 1px solid blue;
  width: 100%;
  height: 100%;
`;

const MenuWrapper = styled.div` 
  display: flex;
  flex-direction: column;
  border: 1px solid green;
  width: 500px;
`;

const Intro = styled.p` 
  font-size: 24px;
  font-weight: 600;
  padding: 0px 20px;
`;

const MapWrapper = styled.div` 
  border: 1px solid purple;
  width: 70%;
`;

const ListItem = styled(NavLink)`
  font-size: 18px;
  font-weight: 600;
  padding: 0px 20px;
  margin: 10px 0px;
  color: black;
  text-decoration: none;
  cursor: pointer;
  
`;

export default HealthcareFinder;
