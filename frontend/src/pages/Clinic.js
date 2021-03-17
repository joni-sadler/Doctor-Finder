import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";

const Clinic = () => {
  const [selectedClinic, setSelectedClinic] = useState({});
  const [clinicDoctors, setClinicDoctors] = useState([]);
  const id = useParams();
  const clinic = id.clinic;

  useEffect(() => {
    fetch(`/clinics/${clinic}`, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      setSelectedClinic(res.data)
      setClinicDoctors(res.doctorData)
    });
  }, [clinic]);

  // useEffect(() => {
  //   fetch(`/doctors`, {
  //       method: "GET",
  //     })
  //       .then((res) => res.json())
  //       .then((res) => setClinicDoctors(res.data));
  // }, [])

  console.log(clinicDoctors);


  return (
    <Container>
      <ClinicName>{selectedClinic.clinicName}</ClinicName>
      <ClinicInfo>{selectedClinic.clinicAddress}</ClinicInfo>
      <ClinicInfo>{selectedClinic.hours}</ClinicInfo>
      <ClinicInfo>{selectedClinic.email}</ClinicInfo>
      {clinicDoctors.length > 0 &&
      <DoctorsDiv>
        <Title>Doctors at this clinic:</Title>
        <DoctorInfo 
          to={`/doctors/${clinicDoctors[0]._id}`}
          key={clinicDoctors[0]._id}
        >
          {clinicDoctors[0].title} {clinicDoctors[0].firstName} {clinicDoctors[0].lastName}
        </DoctorInfo>
      </DoctorsDiv>
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

const ClinicName = styled.p` 
  font-size: 40px;
  font-weight: 600;
`;

const ClinicInfo = styled.p` 
  font-size: 24px;
  font-weight: 500;
`;

const DoctorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p` 
  font-size: 30px;
  font-weight: 600;
`;

const DoctorInfo = styled(NavLink)` 
  font-size: 24px;
  font-weight: 500;
  margin: 0px;
  padding: 0px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

export default Clinic;
