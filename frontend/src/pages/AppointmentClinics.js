import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const AppointmentClinics = () => {
    const [appointmentClinics, setAppointmentClinics] = useState([]);

  useEffect(() => {
    fetch(`/clinic_appointments`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => setAppointmentClinics(res.data));
  }, [])

  console.log(appointmentClinics);


  return (
    <Container>
      <MenuWrapper>
      <MenuText>Walk-In Clinics:</MenuText>
          {appointmentClinics.map((appointmentClinic) => {
            return (
              <ListItem 
                to={`/clinics/${appointmentClinic._id}`}
                key={appointmentClinic._id}
                >
                {appointmentClinic.clinicName}</ListItem>
            )
        })}

      </MenuWrapper>
      <MapWrapper>
        Map goes here
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

export default AppointmentClinics;
