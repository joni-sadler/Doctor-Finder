import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

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
        console.log(res);
        setSelectedClinic(res.data);
        setClinicDoctors(res.doctorData);
      });
  }, [clinic]);

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <ClinicName>{selectedClinic.clinicName}</ClinicName>
        <ClinicInfo>{selectedClinic.clinicAddress}</ClinicInfo>
        <ClinicInfo>Hours: {selectedClinic.hours}</ClinicInfo>
        <ClinicInfo>{selectedClinic.email}</ClinicInfo>
        <ClinicInfo>{selectedClinic.website}</ClinicInfo>
        {clinicDoctors.length > 0 && (
          <DoctorsDiv>
            <Title>Doctors at this clinic:</Title>
            {clinicDoctors.map((clinicDoctor) => {
              return (
                <DoctorInfo
                  to={`/doctors/${clinicDoctor._id}`}
                  key={clinicDoctor._id}
                >
                  {clinicDoctor.title} {clinicDoctor.firstName}{" "}
                  {clinicDoctor.lastName}
                </DoctorInfo>
              );
            })}
          </DoctorsDiv>
        )}
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #085b67;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ClinicName = styled.p`
  font-size: 40px;
  font-weight: 600;
  color: white;
  margin: 5% 0px 2% 0px;
  text-shadow: 1px 1px 1px #000000;
`;

const ClinicInfo = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: white;
  text-shadow: 1px 1px 1px #000000;
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
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const DoctorInfo = styled(NavLink)`
  font-size: 24px;
  font-weight: 500;
  margin: 10px;
  padding: 0px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  text-decoration: none;
  cursor: pointer;
`;

export default Clinic;
