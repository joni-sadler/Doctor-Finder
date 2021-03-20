import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {NavLink, useParams, Redirect} from "react-router-dom";
import UpdateClinic from "../components/UpdateClinic";

const ClinicHomePage = () => {
  const [updateProfileDropdown, setUpdateProfileDropdown] = useState();
  const [deleteProfileDropdown, setDeleteProfileDropdown] = useState();
  const [hasDeletedProfile, setHasDeletedProfile] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState({});
  const id = useParams();
  const clinic = id.clinic;

  useEffect(() => {
    fetch(`/clinics/${clinic}`, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
      setSelectedClinic(res.data)
    });
  }, [clinic]);
  
  
  const deleteFunction = () => {
    fetch(`/clinic_profile/${clinic}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 201) {
        setHasDeletedProfile(true);
      } else {
        console.log("There is an error with the delete request.")
      }
    })
  }

  const updateProfileDropDownTrigger = () => {
    setUpdateProfileDropdown(!updateProfileDropdown);
  }

  const deleteProfileDropdownTrigger = () => {
    setDeleteProfileDropdown(!deleteProfileDropdown);
  }


  return (
    <Container>
      <h2>Hello {selectedClinic.clinicName}!</h2>
      <ViewProfile to={`/clinics/${selectedClinic._id}`}>View Profile</ViewProfile>
      <UpdateProfile onClick={updateProfileDropDownTrigger}>Update Profile</UpdateProfile>
        {updateProfileDropdown &&
          <UpdateClinic selectedClinic={selectedClinic} />
        }

      <ActionItem onClick={deleteProfileDropdownTrigger}>Delete Profile</ActionItem>
        {deleteProfileDropdown &&
          <DeleteContainer>
            <DeleteText>Are you sure you want to delete your profile?</DeleteText>
            <DeleteButton onClick={deleteFunction}>DELETE</DeleteButton>
          </DeleteContainer>
        }

        {hasDeletedProfile &&
          <Redirect to={`/account_deleted`}/>     
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

const ViewProfile = styled(NavLink)` 
  font-size: 24px;
  text-decoration: none;
  color: black;
  margin: 10px;
  cursor: pointer;
`;

const ActionItem = styled.p` 
  font-size: 24px;
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

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DeleteText = styled.p` 
  font-size: 20px;
  font-weight: 700;
`;

const DeleteButton = styled.button` 
  background-color: black;
  color: white;
  border-radius: 3px;
  width: 150px;
  padding: 5px;
  font-size: 30px;
  font-weight: 500;
  cursor: pointer;
`;

export default ClinicHomePage;
