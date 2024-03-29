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
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  // Get full array of clinics for dropdown menu
  useEffect(() => {
    fetch(`/clinics`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setClinics(res.data));
  }, []);

  // Replaces existing values with new input where possible
  const updateInfoHandler = (name) => {
    return ({ target: { value } }) => {
      setCurrentInfo((selectedDoctor) => ({
        ...selectedDoctor,
        [name]: value,
      }));
    };
  };

  // Sort clinics alphabetically by name
  clinics.sort(function (a, b) {
    if (a.clinicName < b.clinicName) {
      return -1;
    }
    if (a.clinicName > b.clinicName) {
      return 1;
    }
    return 0;
  });

  const showEmailHandlerTrue = () => {
    setShowEmail(true);
  };

  const showPhoneNumberHandlerTrue = () => {
    setShowPhoneNumber(true);
  };

  // Updates doctor profile
  const submitFunction = () => {
    setHasSubmittedInfo(true);
    fetch(`/doctor_profile/${selectedDoctor._id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...currentInfo,
        primaryClinic,
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
          <Text>Name of the clinic you are based at:</Text>
          <CategoryNav>
            {clinics.map((clinic) => {
              return (
                <ClinicList
                  onClick={() => setPrimaryClinic(clinic.clinicName)}
                  key={clinic._id}
                  style={{
                    backgroundColor:
                      primaryClinic === clinic.clinicName ? "#B8D0D3" : "",
                  }}
                >
                  {clinic.clinicName}
                </ClinicList>
              );
            })}
          </CategoryNav>
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
            name="bio"
            placeholder="Add a short bio (optional)"
            type="text"
            value={currentInfo.bio}
            onChange={updateInfoHandler("bio")}
            multiline={true}
            textAlign="top"
            style={{
              height: "25px",
              width: "90%",
              overflowY: "scroll",
              textAlign: "top",
            }}
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
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  padding-top: 200px;
  ${onDesktopMediaQuery()} {
    margin: 10px 0px 0px 0px;
    padding-top: 0px;
  }
  ${onTabletMediaQuery()} {
    font-size: 34px;
    margin: 10px 0px 0px 0px;
    padding-top: 0px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 30px;
    margin: 10px 0px;
    padding-top: 0px;
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
  margin-top: 2%;
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
  max-height: 100px;
  overflow-y: auto;
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
  cursor: pointer;
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
