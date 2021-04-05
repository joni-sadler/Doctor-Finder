import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

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
        setSelectedDoctor(res.data);
      });
  }, [doctor]);

  console.log(selectedDoctor);

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Title>
          {selectedDoctor.title} {selectedDoctor.firstName}{" "}
          {selectedDoctor.lastName}
        </Title>
        {selectedDoctor.primaryClinic && (
          <DoctorInfo>
            Primary clinic: {selectedDoctor.primaryClinic}
          </DoctorInfo>
        )}
        {selectedDoctor.specialty && (
          <DoctorInfo>Specialty: {selectedDoctor.specialty}</DoctorInfo>
        )}
        {(selectedDoctor.showEmail || selectedDoctor.showPhoneNumber) && (
          <Title>Contact:</Title>
        )}

        {selectedDoctor.showEmail && (
          <DoctorInfo>Email: {selectedDoctor.email}</DoctorInfo>
        )}
        {selectedDoctor.showPhoneNumber && (
          <DoctorInfo>Phone number: {selectedDoctor.phoneNumber}</DoctorInfo>
        )}
        {selectedDoctor.bio && (
          <BioDiv>
            <Title>Bio:</Title>
            <DoctorInfo>{selectedDoctor.bio}</DoctorInfo>
          </BioDiv>
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
  ${onDesktopMediaQuery()} {
  }
  ${onTabletMediaQuery()} {
    padding-top: 10%;
    text-align: center;
  }
  ${onSmallPhoneMediaQuery()} {
    padding-top: 10%;
    text-align: center;
  }
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
  color: white;
  margin: 5% 0px 2% 0px;
  text-shadow: 1px 1px 1px #000000;
`;

const DoctorInfo = styled.p`
  font-size: 24px;
  font-weight: 500;
  line-height: 40px;
  margin: 5px;
  padding: 0px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  ${onDesktopMediaQuery()} {
  }
  ${onTabletMediaQuery()} {
    font-size: 20px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 18px;
  }
`;

const BioDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 25px;
  width: 70%;
  ${onTabletMediaQuery()} {
    width: 80%;
  }
  ${onSmallPhoneMediaQuery()} {
    width: 90%;
  }
`;

export default Doctor;
