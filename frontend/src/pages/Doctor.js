import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Doctor = () => {
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const id = useParams();
  const doctor = id.doctor;

  console.log(doctor)


  useEffect(() => {
    fetch(`/doctors/${doctor}`, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      setSelectedDoctor(res.data)
    });
  }, []);

  console.log(selectedDoctor);


  return (
    <Container>
      <DoctorName>{selectedDoctor.firstName} {selectedDoctor.lastName}</DoctorName>
      <DoctorInfo>{selectedDoctor.clinicName}</DoctorInfo>
      <DoctorInfo>{selectedDoctor.additionalClinic}</DoctorInfo>
      <DoctorInfo>{selectedDoctor.email}</DoctorInfo>
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
`;

export default Doctor;
