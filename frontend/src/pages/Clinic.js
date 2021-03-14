import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Clinic = () => {
  const [selectedClinic, setSelectedClinic] = useState({});
  const id = useParams();
  const clinic = id.clinic;

  console.log(id)
  console.log(clinic)

  useEffect(() => {
    fetch(`/clinics/${clinic}`, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      setSelectedClinic(res.data)
    });
  }, [clinic]);


  return (
    <Container>
      <ClinicName>{selectedClinic.clinicName}</ClinicName>
      <ClinicInfo>{selectedClinic.clinicAddress}</ClinicInfo>
      <ClinicInfo>{selectedClinic.hours}</ClinicInfo>
      <ClinicInfo>{selectedClinic.email}</ClinicInfo>
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

const ClinicName = styled.p` 
  font-size: 40px;
  font-weight: 600;
`;

const ClinicInfo = styled.p` 
  font-size: 24px;
  font-weight: 500;
`;

export default Clinic;
