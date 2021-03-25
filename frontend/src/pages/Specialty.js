import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";

const Specialty = () => {
  const specialtyObject = useParams();
  const specialty = Object.values(specialtyObject);
  const [allDoctors, setAllDoctors] = useState([]);
  const [displayDoctorInfo, setDisplayDoctorInfo] = useState(false);
  const specialtyDoctors = [];

  useEffect(() => {
    fetch(`/specialty/${specialty}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setAllDoctors(res.data));
  }, []);

  allDoctors.forEach((doctor) => {
    if (doctor.specialty === specialty.toString()) {
      specialtyDoctors.push(doctor);
    }
  });

  specialtyDoctors.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });

  const handleDisplayInfo = () => {
    setDisplayDoctorInfo(!displayDoctorInfo);
  };

  return (
    <Container>
      <SpecialtyTitle>{specialty}</SpecialtyTitle>
      {specialtyDoctors.map((specialtyDoctor) => {
        return (
          <DoctorInfoWrapper>
            <DoctorName key={specialtyDoctor._id} onClick={handleDisplayInfo}>
              {specialtyDoctor.title} {specialtyDoctor.firstName}{" "}
              {specialtyDoctor.lastName}
            </DoctorName>
            {displayDoctorInfo && (
              <DropdownDoctorInfo>
                {specialtyDoctor.primaryClinic && (
                  <DoctorInfo>
                    Primary clinic: {specialtyDoctor.primaryClinic}
                  </DoctorInfo>
                )}
                {specialtyDoctor.secondaryClinic && (
                  <DoctorInfo>
                    Additional clinic: {specialtyDoctor.secondaryClinic}
                  </DoctorInfo>
                )}
                <DoctorPageLink to={`/doctors/${specialtyDoctor._id}`}>
                  View full doctor profile
                </DoctorPageLink>
              </DropdownDoctorInfo>
            )}
          </DoctorInfoWrapper>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const SpecialtyTitle = styled.p`
  font-size: 32px;
  font-weight: 600;
  padding: 20px;
`;

const DoctorInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DoctorName = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin: 30px 0px 10px 0px;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const DropdownDoctorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DoctorInfo = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 0px;
  padding: 5px;
`;

const DoctorPageLink = styled(NavLink)`
  font-size: 20px;
  font-weight: 600;
  margin: 0px;
  padding: 5px;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default Specialty;