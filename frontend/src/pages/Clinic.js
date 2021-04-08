import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const Clinic = () => {
  const [selectedClinic, setSelectedClinic] = useState({});
  const [clinicDoctors, setClinicDoctors] = useState([]);
  const [acceptsAppointments, setAcceptsAppointments] = useState();
  const [acceptsWalkIns, setAcceptsWalkIns] = useState();
  const [acceptsPatients, setAcceptsPatients] = useState();
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

  console.log(selectedClinic);

  useEffect(() => {
    if (selectedClinic.canBookAppointments) {
      setAcceptsAppointments("Yes");
    } else {
      setAcceptsAppointments("No");
    }

    if (selectedClinic.acceptsWalkIns) {
      setAcceptsWalkIns("Yes");
    } else {
      setAcceptsWalkIns("No");
    }

    if (selectedClinic.acceptsPatients) {
      setAcceptsPatients("Yes");
    } else {
      setAcceptsPatients("No");
    }
  });

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <ClinicName>{selectedClinic.clinicName}</ClinicName>
        <ClinicInfo>{selectedClinic.clinicAddress}</ClinicInfo>
        <ClinicInfo>Hours: {selectedClinic.hours}</ClinicInfo>
        <ClinicInfo>{selectedClinic.email}</ClinicInfo>
        <ClinicInfo>{selectedClinic.website}</ClinicInfo>
        <br />
        <br />
        <br />
        <ClinicInfo>
          Has at least one family doctor accepting new patients:{" "}
          {acceptsPatients}
        </ClinicInfo>
        <ClinicInfo>Accepts appointments: {acceptsAppointments}</ClinicInfo>
        <ClinicInfo>Accepts walk-ins: {acceptsWalkIns}</ClinicInfo>
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
  ${onDesktopMediaQuery()} {
  }
  ${onTabletMediaQuery()} {
    padding-top: 10%;
    text-align: center;
  }
  ${onSmallPhoneMediaQuery()} {
    padding: 10% 0 5% 0;
    text-align: center;
  }
`;

const ClinicName = styled.p`
  font-size: 40px;
  font-weight: 600;
  color: white;
  margin: 5% 0px 2% 0px;
  text-shadow: 1px 1px 1px #000000;
  ${onTabletMediaQuery()} {
    margin: 5% 0px 5% 0px;
  }
  ${onSmallPhoneMediaQuery()} {
    margin: 2% 0px 5% 0px;
  }
`;

const ClinicInfo = styled.p`
  font-size: 24px;
  font-weight: 500;
  margin: 10px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  ${onTabletMediaQuery()} {
    font-size: 22px;
    padding: 10px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 18px;
    padding: 10px;
    margin: 0px;
  }
`;

const DoctorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const Title = styled.p`
  font-size: 34px;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  margin-top: 10%;
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
