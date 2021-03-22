import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Doctor = () => {
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const id = useParams();
  const doctor = id.doctor;

  useEffect(() => {
    fetch(`/doctors/${doctor}`, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      setSelectedDoctor(res.data)
    });
  }, [doctor]);
  
  console.log(doctor);

  return (
    <Container>
      <DoctorName>{selectedDoctor.title} {selectedDoctor.firstName} {selectedDoctor.lastName}</DoctorName>
      {selectedDoctor.primaryClinic &&
      <DoctorInfo>Primary clinic: {selectedDoctor.primaryClinic}</DoctorInfo> 
      }
      {selectedDoctor.secondaryClinic &&
      <DoctorInfo>Secondary clinic: {selectedDoctor.secondaryClinic}</DoctorInfo>
      }
      {selectedDoctor.showEmail &&
      <DoctorInfo>Email: {selectedDoctor.email}</DoctorInfo>
      }
      {selectedDoctor.showPhoneNumber &&
      <DoctorInfo>Phone number: {selectedDoctor.phoneNumber}</DoctorInfo>
      }
      {selectedDoctor.specialty &&
      <DoctorInfo>Specialty: {selectedDoctor.specialty}</DoctorInfo>
      }
    </Container>
  )
}

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DoctorName = styled.p` 
  font-size: 40px;
  font-weight: 600;
`;

const DoctorInfo = styled.p` 
  font-size: 24px;
  font-weight: 500;
  margin: 5px;
  padding: 0px;
`;

export default Doctor;
