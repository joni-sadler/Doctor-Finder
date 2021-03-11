import React, {useState} from "react";
import styled from "styled-components";

const HealthcareFinder = () => {
  const [findDoctor, setFindDoctor] = useState(false);
  const [walkInClinic, setWalkInClinic] = useState(false);
  const [appointment, setAppointment] = useState(false);

  const doctorFunction = () => {
    setFindDoctor(!findDoctor);
    setWalkInClinic(false);
    setAppointment(false);
  }

  const clinicFunction = () => {
    setWalkInClinic(!walkInClinic);
    setFindDoctor(false);
    setAppointment(false);
  }

  const appointmentFunction = () => {
    setAppointment(!appointment);
    setFindDoctor(false);
    setWalkInClinic(false);
  }

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
        <MenuText onClick={clinicFunction}>Find a walk-in clinic</MenuText>
          {walkInClinic &&
            <div>
              <ConditionalText>• See the closest walk-in clinic</ConditionalText>
              <ConditionalText>• See a list of all walk-in clinics</ConditionalText>
            </div>
          }
        <MenuText onClick={appointmentFunction}>Make an appointment at a clinic</MenuText>
          {appointment &&
            <div>
              <ConditionalText>• Contact the clinic nearest to me</ConditionalText>
              <ConditionalText>• See a list of all clinics currently booking appointments</ConditionalText>
            </div>
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

const ConditionalText = styled.p` 
  margin: 10px 0px;
  padding: 0px 10px 0px 30px;
`;

const MapWrapper = styled.div` 
  border: 1px solid purple;
  width: 70%;
`;

export default HealthcareFinder;
