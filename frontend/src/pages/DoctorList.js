import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  // Get a list of all doctors in the database
  useEffect(() => {
    fetch(`/doctors`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setDoctors(res.data));
  }, []);

  // Sort the doctors alphabetically
  doctors.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });

  return (
    <PageWrapper>
      <Header />
      <Container>
        <MenuText>All registered doctors in my area:</MenuText>
        {doctors.map((doctor) => {
          return (
            <ListItem to={`/doctors/${doctor._id}`} key={doctor._id}>
              {doctor.title} {doctor.firstName} {doctor.lastName}
            </ListItem>
          );
        })}
      </Container>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: #085b67;
  padding-bottom: 5%;
`;

const MenuText = styled.p`
  font-size: 40px;
  font-weight: 600;
  padding: 0px 20px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const ListItem = styled(NavLink)`
  font-size: 20px;
  font-weight: 600;
  padding: 0px 10px;
  margin: 10px 20px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: #bbc6c7;
  }
`;

export default DoctorList;
