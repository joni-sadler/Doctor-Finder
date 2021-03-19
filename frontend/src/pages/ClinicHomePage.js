import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {NavLink, useParams} from "react-router-dom";
import UpdateClinic from "../components/UpdateClinic";

const ClinicHomePage = () => {
  const [updateProfileDropdown, setUpdateProfileDropdown] = useState();
  const [selectedClinic, setSelectedClinic] = useState({});
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
    });
  }, [clinic]);
  
  console.log(selectedClinic)

  const updateProfileDropDownTrigger = () => {
    setUpdateProfileDropdown(!updateProfileDropdown);
  }


  return (
    <Container>
      <h2>Hello {selectedClinic.clinicName}!</h2>
      <ActionItem to={`/clinics/${selectedClinic._id}`}>View Profile</ActionItem>
      <UpdateProfile onClick={updateProfileDropDownTrigger}>Update Profile</UpdateProfile>
        {updateProfileDropdown &&
          <UpdateClinic selectedClinic={selectedClinic} />
        }

    </Container>
  )
}

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ActionItem = styled(NavLink)` 
  font-size: 24px;
  text-decoration: none;
  color: black;
  margin: 10px;
  cursor: pointer;
`;

const UpdateProfile = styled.p` 
  font-size: 24px;
  color: black;
  margin: 10px;
  cursor: pointer;
`;

export default ClinicHomePage;
