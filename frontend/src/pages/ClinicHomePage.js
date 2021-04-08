import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useParams, Redirect } from "react-router-dom";
import UpdateClinic from "../components/UpdateClinic";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

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
        setSelectedClinic(res.data);
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
          console.log("There is an error with the delete request.");
        }
      });
  };

  const updateProfileDropDownTrigger = () => {
    setUpdateProfileDropdown(!updateProfileDropdown);
    setDeleteProfileDropdown(false);
  };

  const deleteProfileDropdownTrigger = () => {
    setDeleteProfileDropdown(!deleteProfileDropdown);
    setUpdateProfileDropdown(false);
  };

  return (
    <Container>
      <HelloText>Hello {selectedClinic.clinicName}!</HelloText>
      <ViewProfile to={`/clinics/${selectedClinic._id}`}>
        View Profile
      </ViewProfile>
      <ActionItem onClick={updateProfileDropDownTrigger}>
        Update Profile
      </ActionItem>
      {updateProfileDropdown && (
        <UpdateClinicContainer>
          <UpdateClinic selectedClinic={selectedClinic} />
        </UpdateClinicContainer>
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
  font-size: 24px;
  text-decoration: none;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  margin: 10px;
  cursor: pointer;
`;

const UpdateClinicContainer = styled.div`
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

const ActionItem = styled.p`
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  margin: 10px;
  cursor: pointer;
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
  font-size: 24px;
  text-decoration: none;
  color: black;
  margin: 10px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  cursor: pointer;
`;

export default ClinicHomePage;
