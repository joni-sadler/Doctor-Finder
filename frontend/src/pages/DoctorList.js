import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`/doctors`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => setDoctors(res.data));
  }, [])
  
  doctors.sort(function(a, b) {
    if (a.lastName < b.lastName) {return -1;}
    if (a.lastName > b.lastName) {return 1;}
    return 0;
  })

  return (
    <Container>
      <MenuWrapper>
        <MenuText>All registered doctors in my area:</MenuText>
              {doctors.map((doctor) => {
                return (
                  <ListItem
                    to={`/doctors/${doctor._id}`}
                    key={doctor._id}
                  >
                    {doctor.title} {doctor.firstName} {doctor.lastName}</ListItem>
                )
            })}
    
              </MenuWrapper>
              <MapWrapper>
                Map goes here
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
        
    const MenuText = styled.p` 
      font-size: 24px;
      font-weight: 600;
      padding: 0px 20px;
    `;
        
    const MapWrapper = styled.div` 
      border: 1px solid purple;
      width: 70%;
    `;
        
    const ListItem = styled(NavLink)`
      font-size: 16px;
      font-weight: 600;
      padding: 0px 10px;
      margin: 10px 20px;
      color: black;
      text-decoration: none;
      cursor: pointer;
    `;
    
    
export default DoctorList;
