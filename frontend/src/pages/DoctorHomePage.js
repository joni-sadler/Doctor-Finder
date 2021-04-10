import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useParams, Redirect } from "react-router-dom";
// import { useDispatch } from "react-redux";
import UpdateDoctor from "../components/UpdateDoctor";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";
// import { handleDoctorLogout } from "../components/helpers/fetch-request-helpers";

const DoctorHomePage = () => {
  const [updateProfileDropdown, setUpdateProfileDropdown] = useState();
  const [deleteProfileDropdown, setDeleteProfileDropdown] = useState();
  const [hasDeletedProfile, setHasDeletedProfile] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const id = useParams();
  const doctor = id.doctor;

  // const dispatch = useDispatch();

  // Get specific doctor based on id params
  useEffect(() => {
    fetch(`/doctors/${doctor}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setSelectedDoctor(res.data);
      });
  }, [doctor]);

  // Delete selected doctor account
  const deleteFunction = () => {
    fetch(`/doctor_profile/${doctor}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 201) {
          setHasDeletedProfile(true);
        } else {
          console.log("There is an error with the delete request.");
        }
      });
  };

  // Display update profile section
  // Automatically close delete profile section
  const updateProfileDropDownTrigger = () => {
    setUpdateProfileDropdown(!updateProfileDropdown);
    setDeleteProfileDropdown(false);
  };

  // Display delete profile section
  // Automatically close update profile section
  const deleteProfileDropdownTrigger = () => {
    setDeleteProfileDropdown(!deleteProfileDropdown);
    setUpdateProfileDropdown(false);
  };

  // // Handle doctor logout through Redux state
  // const doctorLogoutFunction = () => {
  //   handleDoctorLogout(dispatch);
  // };

  return (
    <Container>
      <HelloText>
        Hello {selectedDoctor.title} {selectedDoctor.firstName}{" "}
        {selectedDoctor.lastName}
      </HelloText>
      <ViewProfile to={`/doctors/${selectedDoctor._id}`}>
        View Profile
      </ViewProfile>
      <ActionItem onClick={updateProfileDropDownTrigger}>
        Update Profile
      </ActionItem>
      {updateProfileDropdown && (
        <UpdateDoctorContainer>
          <UpdateDoctor selectedDoctor={selectedDoctor} />
        </UpdateDoctorContainer>
      )}
      <ActionItem onClick={deleteProfileDropdownTrigger}>
        Delete Profile
      </ActionItem>
      {deleteProfileDropdown && (
        <DeleteContainer>
          <DeleteText>Are you sure you want to delete your profile?</DeleteText>
          <DeleteButton onClick={deleteFunction}>DELETE</DeleteButton>
        </DeleteContainer>
      )}

      {hasDeletedProfile && <Redirect to={`/account_deleted`} />}
      <Logout to={`/`}>Logout</Logout>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #085b67;
  overflow-y: scroll;
`;

const HelloText = styled.p`
  font-size: 40px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  margin-top: 10%;
  text-align: center;
`;

const ViewProfile = styled(NavLink)`
  font-size: 28px;
  text-decoration: none;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  margin: 15px;
  cursor: pointer;
`;

const ActionItem = styled.p`
  font-size: 28px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  margin: 15px;
  cursor: pointer;
`;

const UpdateDoctorContainer = styled.div`
  border-radius: 3px;
  ${onDesktopMediaQuery()} {
    height: 100%;
  }
  ${onTabletMediaQuery()} {
    height: 60%;
    margin: 20px;
  }
  ${onSmallPhoneMediaQuery()} {
    height: 50%;
    width: 90%;
    margin: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
`;

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const DeleteText = styled.p`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const DeleteButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 3px;
  width: 150px;
  padding: 10px;
  font-size: 30px;
  font-weight: 500;
  cursor: pointer;
`;

const Logout = styled(NavLink)`
  font-size: 28px;
  text-decoration: none;
  color: black;
  margin: 15px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  cursor: pointer;
`;

export default DoctorHomePage;
