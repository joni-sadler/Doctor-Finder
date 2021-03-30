import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const ClinicSignup = () => {
  const [signupInfo, setSignupInfo] = useState({});
  const [acceptsPatients, setAcceptsPatients] = useState(false);
  const [acceptsWalkIns, setAcceptsWalkIns] = useState(false);
  const [canBookAppointments, setCanBookAppointments] = useState(false);
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);
  const [clinicNameValidation, setClinicNameValidation] = useState();
  const [clinicAddressValidation, setClinicAddressValidation] = useState();
  const [emailValidation, setEmailValidation] = useState();
  const [phoneNumberValidation, setPhoneNumberValidation] = useState();
  const [passwordValidation, setPasswordValidation] = useState();

  const signupInfoHandler = (name) => {
    return ({ target: { value } }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    };
  };

  const acceptingPatientsHandlerTrue = () => {
    setAcceptsPatients(true);
  };

  const acceptingWalkInHandlerTrue = () => {
    setAcceptsWalkIns(true);
  };

  const acceptingAppointmentsHandlerTrue = () => {
    setCanBookAppointments(true);
  };

  // Validate clinic name
  useEffect(() => {
    if (!signupInfo.clinicName) {
      setClinicNameValidation(false);
    } else {
      setClinicNameValidation(true);
    }
  }, [signupInfo.clinicName]);

  // Validate clinic email address
  useEffect(() => {
    if (!signupInfo.clinicAddress) {
      setClinicAddressValidation(false);
    } else {
      setClinicAddressValidation(true);
    }
  }, [signupInfo.clinicAddress]);

  // Validate email
  useEffect(() => {
    if (!signupInfo.email) {
      setEmailValidation(false);
    } else {
      setEmailValidation(true);
    }
    console.log(emailValidation);
  }, [signupInfo.email]);

  //Validate phone number
  useEffect(() => {
    if (!signupInfo.phoneNumber) {
      setPhoneNumberValidation(false);
    } else {
      setPhoneNumberValidation(true);
    }
  }, [signupInfo.phoneNumber]);

  // Validate password
  useEffect(() => {
    if (!signupInfo.password) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
  }, [signupInfo.password]);

  const submitFunction = () => {
    setHasSubmittedInfo(true);
    console.log(signupInfo);
    fetch("/clinic_signup", {
      method: "POST",
      body: JSON.stringify({
        ...signupInfo,
        acceptsPatients,
        acceptsWalkIns,
        canBookAppointments,
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
          setSignupInfo(res.data);
        } else {
          console.log("There is an error with the post request.");
        }
      });
  };

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Title>Create a new clinic account</Title>
        <SignupWrapper>
          <InputDiv>
            <Field>
              <input
                name="clinicName"
                placeholder="Name of your clinic"
                type="text"
                value={signupInfo.clinicName}
                onChange={signupInfoHandler("clinicName")}
                style={{
                  height: "25px",
                  width: "90%",
                  marginTop: "10px",
                  marginLeft: "5px",
                }}
              />{" "}
              *
            </Field>
            <Field>
              <input
                name="clinicAddress"
                placeholder="Address of your clinic"
                type="text"
                value={signupInfo.clinicAddress}
                onChange={signupInfoHandler("clinicAddress")}
                style={{
                  height: "25px",
                  width: "90%",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              />{" "}
              *
            </Field>
            <Field>
              <input
                name="email"
                placeholder="Email"
                type="text"
                value={signupInfo.email}
                onChange={signupInfoHandler("email")}
                style={{
                  height: "25px",
                  width: "90%",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              />{" "}
              *
            </Field>
            <Field>
              <input
                name="phoneNumber"
                placeholder="Phone number"
                type="text"
                required
                value={signupInfo.phoneNumber}
                onChange={signupInfoHandler("phoneNumber")}
                style={{
                  height: "25px",
                  width: "90%",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              />{" "}
              *
            </Field>
            <Field>
              <input
                name="hours"
                placeholder="What are your opening hours?"
                type="text"
                value={signupInfo.hours}
                onChange={signupInfoHandler("hours")}
                style={{
                  height: "25px",
                  width: "90%",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              />{" "}
              *
            </Field>
            <Field>
              <input
                name="specialties"
                placeholder="List any special services"
                type="text"
                value={signupInfo.specialties}
                onChange={signupInfoHandler("specialties")}
                style={{
                  height: "25px",
                  width: "90%",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              />
            </Field>
            <Field>
              <input
                name="password"
                placeholder="Set your password"
                type="password"
                value={signupInfo.password}
                onChange={signupInfoHandler("password")}
                style={{
                  height: "25px",
                  width: "90%",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              />{" "}
              *
            </Field>
            <Field>
              <p>Are any of your doctors accepting new patients?</p>
              <input
                name="acceptsPatients"
                type="radio"
                value="True"
                onChange={acceptingPatientsHandlerTrue}
              />{" "}
              Yes
              <input name="acceptsPatients" type="radio" value="False" /> No
            </Field>
            <Field>
              <p>Do you accept walk-ins?</p>
              <input
                name="acceptsWalkins"
                type="radio"
                value="True"
                onChange={acceptingWalkInHandlerTrue}
              />{" "}
              Yes
              <input name="acceptsWalkins" type="radio" value="False" /> No
            </Field>
            <Field>
              <p>Can patients book an appointment at your clinic?</p>
              <input
                name="acceptsAppointments"
                type="radio"
                value="True"
                onChange={acceptingAppointmentsHandlerTrue}
              />{" "}
              Yes
              <input name="acceptsAppointments" type="radio" value="False" /> No
            </Field>
          </InputDiv>
          <RequiredFields>* Required fields</RequiredFields>
          <SubmitWrapper>
            {clinicNameValidation &&
            clinicAddressValidation &&
            emailValidation &&
            phoneNumberValidation &&
            passwordValidation ? (
              <SubmitButton onClick={submitFunction}>Submit</SubmitButton>
            ) : (
              <SubmitButtonInactive>
                Please complete all required fields
              </SubmitButtonInactive>
            )}
          </SubmitWrapper>
        </SignupWrapper>
        {hasSubmittedInfo && (
          <div>
            <RegistrationMessaging>
              Thank you for registering! Your info is now securely stored in our
              database.
            </RegistrationMessaging>
          </div>
        )}
        <HomepagePrompt>
          <HomePageText to={`/`}>Return to the home page</HomePageText>
        </HomepagePrompt>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #085b67;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${onSmallPhoneMediaQuery()} {
    margin: 10px;
  }
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
  margin: 40px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const SignupWrapper = styled.div`
  background: #ffffff;
  border-radius: 3px;
  position: inherit;
  top: 10%;
  right: 10px;
  width: 90%;
  opacity: 1;
  padding-left: 5px;
  margin: 5px 10px 15px 10px;
  border: 1px solid black;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  padding: 10px;
`;

const InputDiv = styled.div`
  padding-top: 10px;
`;

const RequiredFields = styled.p`
  padding-left: 10px;
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

const SubmitButtonInactive = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  background-color: #606060;
  color: white;
  border-radius: 3px;
  width: 90%;
  padding: 10px 5px;
  margin-bottom: 25px;
  font-size: 24px;
  font-weight: 500;
  ${onSmallPhoneMediaQuery()} {
    font-size: 18px;
  }
`;

const RegistrationMessaging = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const ConfirmationText = styled.p`
  font-size: 24px;
  font-weight: 600;
  padding-top: 20px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const HomepagePrompt = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const HomePageText = styled(NavLink)`
  background-color: black;
  padding: 15px;
  border-radius: 3px;
  font-size: 30px;
  font-weight: 600;
  margin: 15px 15px 50px 15px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  ${onDesktopMediaQuery()} {
    font-size: 28px;
  }
  ${onTabletMediaQuery()} {
    font-size: 24px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 20px;
  }
`;

export default ClinicSignup;
