import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {NavLink, useParams, Redirect} from "react-router-dom";
import UpdateDoctor from "../components/UpdateDoctor";

const DoctorHomePage = () => {
  const [updateProfileDropdown, setUpdateProfileDropdown] = useState();
  const [deleteProfileDropdown, setDeleteProfileDropdown] = useState();
  const [hasDeletedProfile, setHasDeletedProfile] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const id = useParams();
  const doctor = id.doctor;

  useEffect(() => {
    fetch(`/doctors/${doctor}`, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      setSelectedDoctor(res.data)
    });
  }, [doctor]);
  

  const deleteFunction = () => {
    fetch(`/doctor_profile/${doctor}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 201) {
        console.log(res.data)
        setHasDeletedProfile(true);
      } else {
        console.log("There is an error with the post request.")
      }
    })
  }

  console.log(hasDeletedProfile);

  const updateProfileDropDownTrigger = () => {
    setUpdateProfileDropdown(!updateProfileDropdown);
  }

  const deleteProfileDropdownTrigger = () => {
    setDeleteProfileDropdown(!deleteProfileDropdown);
  }


  return (
    <Container>
      <h2>Hello {selectedDoctor.firstName} {selectedDoctor.lastName}!</h2>
      <ViewProfile to={`/doctors/${selectedDoctor._id}`}>View Profile</ViewProfile>
      <ActionItem onClick={updateProfileDropDownTrigger}>Update Profile</ActionItem>
        {updateProfileDropdown &&
          <UpdateDoctor selectedDoctor={selectedDoctor} />
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
      {/* <ActionItem to={`/doctors/${selectedDoctor._id}`}>Logout</ActionItem> */}
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

export default DoctorHomePage;
