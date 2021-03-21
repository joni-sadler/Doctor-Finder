import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Map from "../components/Map";

const HealthcareFinder = () => {
  const [displaySpecialties, setDisplaySpecialties] = useState(false)
  // const [clinics, setClinics] = useState([]);

  //   useEffect(() => {
  //     fetch(`/healthcare_finder`, {
  //         method: "GET",
  //       })
  //         .then((res) => res.json())
  //         .then((res) => setClinics(res.data));
  //   }, [])

  //   console.log(clinics);

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`/doctors`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => setDoctors(res.data));
  }, [])

  // doctors.forEach(doctor => console.log(doctor.specialty))
  
  const onClickSpecialties = () => {
    setDisplaySpecialties(!displaySpecialties);
    console.log("display specialties")
  }

  console.log(displaySpecialties);

  const doctorSpecialties = doctors.map(doctor => doctor.specialty).filter((value, index, self) => self.indexOf(value) === index)
  
  const filteredDoctorSpecialties = doctorSpecialties.filter(function(element) {
    return element !== undefined;
  })

  return (
    <Container>
      <MenuWrapper>
        <Intro>I want to...</Intro>
        <ListItem to={`/doctor_finder`}>Find a family doctor</ListItem>
        <ListItem to={`/walk_in_clinics`}>Find a walk-in clinic</ListItem>
        <ListItem to={`/clinic_appointments`}>Find a clinic that accepts appointments</ListItem>
        <ListItem to={`/doctors`}>See all doctors in my area</ListItem>
        <ListItem to={`/clinics`}>See all clinics in my area</ListItem>
        <SearchBySpeciality onClick={onClickSpecialties}>Search by specialty</SearchBySpeciality>
          {displaySpecialties &&
            <div>
              {filteredDoctorSpecialties.map((specialty) => {
                return (
                  <div>
                    <Specialty 
                      to={`/`}
                      key={specialty}
                    >
                      {specialty}
                    </Specialty>
                  </div>
                )
              })}
            </div>
          }

      </MenuWrapper>
      <MapWrapper>
        {/* <Map /> */}
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

const MapWrapper = styled.div` 
  border: 1px solid purple;
  width: 70%;
`;

const ListItem = styled(NavLink)`
  font-size: 18px;
  font-weight: 600;
  padding: 0px 20px;
  margin: 10px 0px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const SearchBySpeciality = styled.div` 
  font-size: 18px;
  font-weight: 600;
  padding: 0px 20px;
  margin: 10px 0px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const Specialty = styled(NavLink)` 
  font-size: 18px;
  font-weight: 500;
  margin: 30px;
  text-decoration: none;
  color: black;
`;

export default HealthcareFinder;
