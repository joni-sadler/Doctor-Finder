import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Map from "../components/Map";

const WalkInClinics = () => {
  const [walkInClinics, setWalkInClinics] = useState([]);

  useEffect(() => {
    fetch(`/walk_in_clinics`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => setWalkInClinics(res.data));
  }, [])

  console.log(walkInClinics);


  return (
    <Container>
      <MenuWrapper>
        <MenuText>Walk-In Clinics:</MenuText>
          {walkInClinics.map((walkInClinic) => {
            return (
              <ListItem 
                to={`/clinics/${walkInClinic._id}`}
                key={walkInClinic._id}
                >
                {walkInClinic.clinicName}</ListItem>
            )
        })}

      </MenuWrapper>
      <MapWrapper>
        <Map walkInClinics={walkInClinics} />
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

const MenuText = styled.p` 
  font-size: 24px;
  font-weight: 600;
  padding: 0px 20px;
`;

const MapWrapper = styled.div` 
  border: 1px solid purple;
  width: 70%;
`;

const ListItem = styled(NavLink)`
  font-size: 16px;
  font-weight: 600;
  padding: 0px 10px;
  margin: 10px 20px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

export default WalkInClinics;
