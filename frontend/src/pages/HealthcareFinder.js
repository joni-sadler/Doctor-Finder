import React, {useState} from "react";
import styled from "styled-components";
import WalkInClinics from "./WalkInClinics";
import { NavLink } from "react-router-dom";

const HealthcareFinder = () => {
  const [findDoctor, setFindDoctor] = useState(false);
  const [walkInClinic, setWalkInClinic] = useState(false);
  const [appointment, setAppointment] = useState(false);
  const [listWalkInClinics, setListWalkInClinics] = useState([]);
  const [listAppointmentClinics, setListAppointmentClinics] = useState([]);

  const doctorFunction = () => {
    setFindDoctor(!findDoctor);
    setWalkInClinic(false);
    setAppointment(false);
  }

  // const clinicFunction = () => {
  //   setWalkInClinic(!walkInClinic);
  //   setFindDoctor(false);
  //   setAppointment(false);
  //   fetch(`/healthcare_finder`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((res) => setListWalkInClinics(res.data));
  // }

  console.log(listWalkInClinics);

  const appointmentFunction = () => {
    setAppointment(!appointment);
    setFindDoctor(false);
    setWalkInClinic(false);
    fetch(`/healthcare_finder`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setListAppointmentClinics(res.data));
  }
  
  console.log(listAppointmentClinics);

  return (
    <Container>
      <MenuWrapper>
        <Intro>I want to...</Intro>
        <MenuText onClick={doctorFunction}>Find a family doctor</MenuText>
          {findDoctor &&
            <div>
              <ConditionalText>• See a list of clinics currently accepting patients</ConditionalText>
              <ConditionalText>• Find a doctor near me</ConditionalText>
            </div>
          }


        <ListItem to={`/walk_in_clinics`}>Find a walk-in clinic</ListItem>

        <MenuText onClick={appointmentFunction}>Find a clinic that accepts appointments</MenuText>
          {appointment &&
            <ConditionalDiv>
            {/* <ConditionalText>• See the closest walk-in clinic</ConditionalText>
            <ConditionalText>• See a list of all walk-in clinics</ConditionalText> */}
              {/* <WalkInClinics /> */}
              {listAppointmentClinics.map((appointmentClinic) => {
                return (
                  <ListItem
                    to={`/`}
                  >
                    {appointmentClinic.clinicName}
                  </ListItem>
                )
              })}

          </ConditionalDiv>
          }
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

const Intro = styled.p` 
  font-size: 24px;
  font-weight: 600;
  padding: 0px 20px;
`;

const MenuText = styled.p` 
  font-size: 18px;
  font-weight: 600;
  padding: 0px 20px;
  margin: 10px 0px;
  cursor: pointer;
`;

const ConditionalDiv = styled.div` 
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  padding: 0px 10px 0px 30px;
`;

const ConditionalText = styled.p` 
  margin: 10px 0px;
  padding: 0px 10px 0px 30px;
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
