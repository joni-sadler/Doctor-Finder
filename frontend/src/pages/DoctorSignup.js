import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const DoctorSignup = () => {
  const [signupInfo, setSignupInfo] = useState({});
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [primaryClinic, setPrimaryClinic] = useState();
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

  const submitFunction = () => {
    setHasSubmittedInfo(true);
    fetch("/doctor_signup", {
      method: "POST",
      body: JSON.stringify({
        ...signupInfo,
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
          <RegistrationHeader>
            Please complete the following form:
          </RegistrationHeader>
          <InputDiv>
            <Field>
              <input
                name="title"
                placeholder="Title"
                type="text"
                value={signupInfo.title}
                onChange={signupInfoHandler("title")}
                style={{
                  height: "25px",
                  width: "80%",
                  marginTop: "5px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
            </Field>
            <Field>
              <div>
                <input
                  name="firstName"
                  placeholder="First name"
                  type="text"
                  value={signupInfo.firstName}
                  onChange={signupInfoHandler("firstName")}
                  style={{
                    height: "25px",
                    width: "80%",
                    marginTop: "5px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                />
                {"  "}*
              </div>
              {!firstNameValidation && hasSubmittedInfo && (
                <p>This field is required</p>
              )}
            </Field>
            <Field>
              <div>
                <input
                  name="lastName"
                  placeholder="Last name"
                  type="text"
                  value={signupInfo.lastName}
                  onChange={signupInfoHandler("lastName")}
                  style={{
                    height: "25px",
                    width: "80%",
                    marginTop: "5px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                />
                {"  "}*
              </div>
            </Field>
            <Field>
              <div>
                <input
                  name="email"
                  placeholder="Email"
                  type="text"
                  value={signupInfo.email}
                  onChange={signupInfoHandler("email")}
                  style={{
                    height: "25px",
                    width: "80%",
                    marginTop: "5px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                />{" "}
                *
              </div>
            </Field>
            <Field>
              <Text>Show my email as part of my public doctor profile?</Text>
              <div>
                <input
                  name="showEmail"
                  type="radio"
                  value="True"
                  onChange={showEmailHandlerTrue}
                />{" "}
                Yes
                <input name="showEmail" type="radio" value="False" /> No
              </div>
            </Field>
            <Field>
              <input
                name="phoneNumber"
                placeholder="Phone number"
                type="text"
                value={signupInfo.phoneNumber}
                onChange={signupInfoHandler("phoneNumber")}
                style={{ height: "25px", width: "80%", marginTop: "5px" }}
              />
            </Field>
            <Field>
              <Text>
                Show my phone number as part of my public doctor profile?
              </Text>
              <div>
                <input
                  name="showPhoneNumber"
                  type="radio"
                  value="True"
                  onChange={showPhoneNumberHandlerTrue}
                />{" "}
                Yes
                <input name="showPhoneNumber" type="radio" value="False" /> No
              </div>
            </Field>
            <ClinicDropdown>
              <Text>Name of the clinic you are based at:</Text>
              <CategoryNav>
                {clinics.map((clinic) => {
                  return (
                    <ClinicList
                      onClick={() => setPrimaryClinic(clinic.clinicName)}
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
                placeholder="List any specialty practices"
                type="text"
                value={signupInfo.specialty}
                onChange={signupInfoHandler("specialty")}
                style={{
                  height: "25px",
                  width: "80%",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              />
            </Field>
            <Field>
              <input
                name="bio"
                placeholder="Add a short bio (optional)"
                type="text"
                value={signupInfo.bio}
                onChange={signupInfoHandler("bio")}
                multiline={true}
                textAlign="top"
                style={{
                  height: "25px",
                  width: "80%",
                  marginTop: "5px",
                  marginLeft: "5px",
                  overflowY: "scroll",
                  textAlign: "top",
                }}
              />
            </Field>
            <Field>
              <div>
                <input
                  name="password"
                  placeholder="Set your password"
                  type="password"
                  value={signupInfo.password}
                  onChange={signupInfoHandler("password")}
                  style={{
                    height: "25px",
                    width: "80%",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                />{" "}
                *
              </div>
            </Field>
          </InputDiv>
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
            <ConfirmationText>
              Thank you for registering! Your info is now securely stored in our
              database.
            </ConfirmationText>
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
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
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
  padding-left: 5px;
  margin: 5px 10px 15px 10px;
  border: 1px solid black;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const RegistrationHeader = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 90%;
`;

const InputDiv = styled.div`
  padding-top: 10px;
`;

const Text = styled.p`
  margin: 5px 0px 5px 10px;
  cursor: pointer;
`;

const ClinicDropdown = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 73%;
  opacity: 1;
  padding-left: 5px;
  margin: 5px 0px 15px 10px;
  max-height: 100px;
  border: 1px solid black;
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
  &:active {
    background-color: skyblue;
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
  margin-bottom: 25px;
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

const ConfirmationText = styled.p`
  font-size: 24px;
  font-weight: 600;
  padding-top: 20px;
  margin: 0 5%;
  text-align: center;
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

export default DoctorSignup;
