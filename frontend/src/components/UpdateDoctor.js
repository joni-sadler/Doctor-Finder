import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const UpdateDoctor = ({ selectedDoctor }) => {
  const [currentInfo, setCurrentInfo] = useState(selectedDoctor);
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [primaryClinic, setPrimaryClinic] = useState();
  const [secondaryClinic, setSecondaryClinic] = useState();
  const [displayPrimaryClinicMenu, setDisplayPrimaryClinicMenu] = useState(
    false
  );
  const [displaySecondaryClinicMenu, setDisplaySecondaryClinicMenu] = useState(
    false
  );
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  useEffect(() => {
    fetch(`/clinics`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setClinics(res.data));
  }, []);

  // console.log(selectedDoctor);
  console.log(selectedDoctor._id);

  const updateInfoHandler = (name) => {
    return ({ target: { value } }) => {
      setCurrentInfo((selectedDoctor) => ({
        ...selectedDoctor,
        [name]: value,
      }));
    };
  };

  const primaryClinicMenuHandler = () => {
    setDisplayPrimaryClinicMenu(!displayPrimaryClinicMenu);
  };

  const secondaryClinicMenuHandler = () => {
    setDisplaySecondaryClinicMenu(!displaySecondaryClinicMenu);
  };

  console.log(currentInfo);

  const showEmailHandlerTrue = () => {
    setShowEmail(true);
  };

  const showPhoneNumberHandlerTrue = () => {
    setShowPhoneNumber(true);
  };

  const submitFunction = () => {
    setHasSubmittedInfo(true);
    fetch(`/doctor_profile/${selectedDoctor._id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...currentInfo,
        primaryClinic,
        secondaryClinic,
        showEmail,
        showPhoneNumber,
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          console.log(res.data);
          setCurrentInfo(res.data);
        } else {
          console.log("There is an error with the post request.");
        }
      });
  };

  return (
    <Container>
      <SignupWrapper>
        <Title>Update Your Profile</Title>
        <Field>
          <input
            name="title"
            placeholder="Title"
            type="text"
            required
            value={currentInfo.title}
            onChange={updateInfoHandler("title")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <input
            name="firstName"
            placeholder="First name"
            type="text"
            required
            value={currentInfo.firstName}
            onChange={updateInfoHandler("firstName")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <input
            name="lastName"
            placeholder="Last name"
            type="text"
            required
            value={currentInfo.lastName}
            onChange={updateInfoHandler("lastName")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <input
            name="email"
            placeholder="Email"
            type="text"
            required
            value={currentInfo.email}
            onChange={updateInfoHandler("email")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <p>Show my email as part of my public doctor profile?</p>
          <input
            name="showEmail"
            type="radio"
            value="True"
            onChange={showEmailHandlerTrue}
          />{" "}
          Yes
          <input name="showEmail" type="radio" value="False" /> No
        </Field>
        <Field>
          <input
            name="phoneNumber"
            placeholder="Phone number"
            type="text"
            required
            value={currentInfo.phoneNumber}
            onChange={updateInfoHandler("phoneNumber")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <p>Show my phone number as part of my public doctor profile?</p>
          <input
            name="showPhoneNumber"
            type="radio"
            value="True"
            onChange={showPhoneNumberHandlerTrue}
          />{" "}
          Yes
          <input name="showPhoneNumber" type="radio" value="False" /> No
        </Field>
        <ClinicDropdown>
          <Text onClick={primaryClinicMenuHandler}>
            Name of the clinic you are based at:
          </Text>
          {displayPrimaryClinicMenu && (
            <CategoryNav>
              {clinics.map((clinic) => {
                return (
                  <ClinicList
                    onClick={() => setPrimaryClinic(clinic.clinicName)}
                  >
                    {clinic.clinicName}
                  </ClinicList>
                );
              })}
            </CategoryNav>
          )}
        </ClinicDropdown>
        <ClinicDropdown>
          <Text onClick={secondaryClinicMenuHandler}>
            If you work at an additional clinic, please select it:
          </Text>
          {displaySecondaryClinicMenu && (
            <CategoryNav>
              {clinics.map((clinic) => {
                return (
                  <ClinicList
                    onClick={() => setSecondaryClinic(clinic.clinicName)}
                  >
                    {clinic.clinicName}
                  </ClinicList>
                );
              })}
            </CategoryNav>
          )}
        </ClinicDropdown>
        <Field>
          <input
            name="specialty"
            placeholder="Do you specialize in a particular type of medicine?"
            type="text"
            required
            value={currentInfo.additionalClinicName}
            onChange={updateInfoHandler("specialty")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <input
            name="password"
            placeholder="Set your password"
            type="password"
            required
            value={currentInfo.password}
            onChange={updateInfoHandler("password")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <SubmitWrapper>
          <SubmitButton onClick={submitFunction}>Submit</SubmitButton>
        </SubmitWrapper>
        {hasSubmittedInfo && (
          <SubmitConfirmation>
            <SubmitMessage>Your profile has been updated.</SubmitMessage>
          </SubmitConfirmation>
        )}
      </SignupWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  margin: 20% 0px 0px 0px;
  padding: 20px;
  ${onDesktopMediaQuery()} {
    margin: 10px 0px 0px 0px;
  }
  ${onTabletMediaQuery()} {
    margin: 10px 0px 0px 0px;
  }
  ${onSmallPhoneMediaQuery()} {
    margin: 10px 0px 0px 0px;
  }
`;

const SignupWrapper = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  border-radius: 3px;
  padding: 20px;
  background-color: white;
  overflow-y: auto;
  ${onDesktopMediaQuery()} {
    flex-direction: column;
    justify-content: flex-start;
  }
  ${onTabletMediaQuery()} {
    height: 100%;
    width: 100%;
  }
  ${onSmallPhoneMediaQuery()} {
    height: 100%;
    width: 90%;
  }
`;

const Field = styled.div`
  padding: 10px;
`;

const Text = styled.p`
  margin-left: 10px;
  cursor: pointer;
`;

const ClinicDropdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryNav = styled.nav`
  background: #ffffff;
  border-radius: 3px;
  position: inherit;
  top: 10%;
  right: 10px;
  width: 80%;
  opacity: 1;
  padding-left: 5px;
  margin: 0px 0px 10px 10px;
  border: 1px solid black;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ClinicList = styled.p`
  margin: 5px;
  padding: 3px;
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 3px;
  width: 150px;
  padding: 5px;
  font-size: 30px;
  font-weight: 500;
`;

const SubmitConfirmation = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SubmitMessage = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 20px;
`;

export default UpdateDoctor;
