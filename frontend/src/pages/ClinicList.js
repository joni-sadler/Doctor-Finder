import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Map from "../components/Map";

const ClinicList = () => {
  const [clinics, setClinics] = useState([]);

    useEffect(() => {
      fetch(`/clinics`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => setClinics(res.data));
    }, [])

    clinics.sort(function(a, b) {
      if (a.clinicName < b.clinicName) {return -1;}
      if (a.clinicName > b.clinicName) {return 1;}
      return 0;
    })


  return (
    <Container>
      <MenuWrapper>
        <MenuText>All registered clinics in my area:</MenuText>
              {clinics.map((clinic) => {
                return (
                  <ListItem
                    to={`/clinics/${clinic._id}`}
                    key={clinic._id}
                  >
                    {clinic.clinicName}</ListItem>
                )
            })}
    
              </MenuWrapper>
              <MapWrapper>
                <Map clinics={clinics}/>
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
    
    
export default ClinicList;
