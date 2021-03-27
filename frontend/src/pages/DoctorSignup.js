import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fadeInDown, fadeOutUp } from "react-animations";
import Header from "../components/Header";

const DoctorSignup = () => {
  const [signupInfo, setSignupInfo] = useState({});
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [primaryClinic, setPrimaryClinic] = useState();
  const [secondaryClinic, setSecondaryClinic] = useState();
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [firstNameValidation, setFirstNameValidation] = useState();
  const [lastNameValidation, setLastNameValidation] = useState();
  const [emailValidation, setEmailValidation] = useState();
  const [passwordValidation, setPasswordValidation] = useState();

  useEffect(() => {
    fetch(`/clinics`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setClinics(res.data));
  }, []);

  const signupInfoHandler = (name) => {
    return ({ target: { value } }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    };
  };

  // Validate first name
  useEffect(() => {
    if (!signupInfo.firstName) {
      setFirstNameValidation(false);
    } else {
      setFirstNameValidation(true);
    }
    console.log(firstNameValidation);
  }, [signupInfo.firstName]);

  // Validate last name
  useEffect(() => {
    if (!signupInfo.lastName) {
      setLastNameValidation(false);
    } else {
      setLastNameValidation(true);
    }
    console.log(lastNameValidation);
  }, [signupInfo.lastName]);

  // Validate email
  useEffect(() => {
    if (!signupInfo.email) {
      setEmailValidation(false);
    } else {
      setEmailValidation(true);
    }
    console.log(emailValidation);
  }, [signupInfo.email]);

  // Validate password
  useEffect(() => {
    if (!signupInfo.password) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
  }, [signupInfo.password]);

  const showEmailHandlerTrue = () => {
    setShowEmail(true);
  };

  const showPhoneNumberHandlerTrue = () => {
    setShowPhoneNumber(true);
  };

  console.log(signupInfo);

  // const handleValidation = () => {
  //   if (signupInfo.firstName !== "") {
  //     setFirstNameValidation(true);
  //   } else if (signupInfo.lastName !== "") {
  //     setLastNameValidation(true);
  //   } else if (signupInfo.email.includes("@")) {
  //     setEmailValidation(true);
  //   } else if (signupInfo.password !== "") {
  //     setPasswordValidation(true);
  //   } else {
  //     submitFunction();
  //   }
  // }

  const submitFunction = () => {
    setHasSubmittedInfo(true);
    fetch("/doctor_signup", {
      method: "POST",
      body: JSON.stringify({
        ...signupInfo,
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
        <Title>Create a new doctor account</Title>
        <SignupWrapper>
          <Field>
            <input
              name="title"
              placeholder="Title"
              type="text"
              value={signupInfo.title}
              onChange={signupInfoHandler("title")}
              style={{ height: "25px", width: "400px" }}
            />
          </Field>
          <Field>
            <input
              name="firstName"
              placeholder="First name"
              type="text"
              value={signupInfo.firstName}
              onChange={signupInfoHandler("firstName")}
              style={{ height: "25px", width: "400px" }}
            />{" "}
            *
            {!firstNameValidation && hasSubmittedInfo && (
              <p>This field is required</p>
            )}
          </Field>
          <Field>
            <input
              name="lastName"
              placeholder="Last name"
              type="text"
              value={signupInfo.lastName}
              onChange={signupInfoHandler("lastName")}
              style={{ height: "25px", width: "400px" }}
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
              style={{ height: "25px", width: "400px" }}
            />{" "}
            *
          </Field>
          <Field>
            <Text>Show my email as part of my public doctor profile?</Text>
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
              value={signupInfo.phoneNumber}
              onChange={signupInfoHandler("phoneNumber")}
              style={{ height: "25px", width: "400px" }}
            />
          </Field>
          <Field>
            <Text>
              Show my phone number as part of my public doctor profile?
            </Text>
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
                  >
                    {clinic.clinicName}
                  </ClinicList>
                );
              })}
            </CategoryNav>
          </ClinicDropdown>
          <ClinicDropdown>
            <Text>If you work at an additional clinic, please select it:</Text>
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
          </ClinicDropdown>
          <Field>
            <input
              name="specialty"
              placeholder="If you specialize in particular type(s) of medicine, list them. "
              type="text"
              value={signupInfo.additionalClinicName}
              onChange={signupInfoHandler("specialty")}
              style={{ height: "25px", width: "400px" }}
            />
          </Field>
          <Field>
            <input
              name="password"
              placeholder="Set your password"
              type="password"
              value={signupInfo.password}
              onChange={signupInfoHandler("password")}
              style={{ height: "25px", width: "400px" }}
            />{" "}
            *
          </Field>
          <RequiredFields>* Required fields</RequiredFields>
          <SubmitWrapper>
            {firstNameValidation &&
            lastNameValidation &&
            emailValidation &&
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
        <LoginPrompt to={`/login`}>Return to the login page</LoginPrompt>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vw;
  width: 100%;
  background-color: #085b67;
`;

const ContentWrapper = styled.div`
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
  margin: 40px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  padding: 20px;
`;

const Field = styled.div`
  padding: 10px;
`;

const Text = styled.p`
  margin-left: 10px;
  /* color: white; */
  cursor: pointer;
`;

const ClinicDropdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const slideDown = keyframes`
  ${fadeInDown};
`;

const slideUp = keyframes`
  ${fadeOutUp};
`;

const RequiredFields = styled.p`
  padding-left: 10px;
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
  max-height: 100px;
  border: 1px solid black;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  /* animation: 0.3s ${slideDown}; */
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

const SubmitButtonInactive = styled.div`
  display: flex;
  justify-content: center;
  background-color: grey;
  color: white;
  border-radius: 3px;
  width: 90%;
  padding: 10px 5px;
  font-size: 24px;
  font-weight: 500;
`;

const RegistrationMessaging = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const LoginPrompt = styled(NavLink)`
  font-size: 30px;
  font-weight: 600;
  margin: 50px;
  text-decoration: none;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

export default DoctorSignup;
