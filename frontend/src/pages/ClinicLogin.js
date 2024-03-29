import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect, NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { handleClinicLogin } from "../components/helpers/fetch-request-helpers";
import Header from "../components/Header";

const ClinicLogin = () => {
  const [clinicLoginInfo, setClinicLoginInfo] = useState({});
  const [clinicArray, setClinicArray] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState();
  const [incorrectLogin, setIncorrectLogin] = useState();

  // const dispatch = useDispatch();

  // Get list of all clinics in database and store them in clinicArray
  useEffect(() => {
    fetch(`/clinics`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setClinicArray(res.data));
  }, []);

  // Collect the email and password the user has logged in with and assign them to clinicLoginInfo
  const clinicLoginHandler = (name) => {
    return ({ target: { value } }) => {
      setClinicLoginInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    };
  };

  // Compare clinicLoginInfo with email and password stored in the database
  // If correct, selectedClinic is assigned and user is redirected to clinic home page
  // If incorrect, an error message is displayed
  const clinicSubmitFunction = () => {
    clinicArray.forEach((clinic) => {
      if (
        clinicLoginInfo.email === clinic.email &&
        clinicLoginInfo.password === clinic.password
      ) {
        setSelectedClinic(clinic);
      } else {
        setIncorrectLogin(true);
      }
    });
  };

  // Handle clinic login through Redux state
  // useEffect(() => {
  //   if (selectedClinic) {
  //     handleClinicLogin(dispatch);
  //   }
  // }, [selectedClinic, dispatch]);

  return (
    <Container>
      <Header />
      <LoginDiv>
        <Dropdown>
          <Title>Clinic Administrator Login</Title>
          <LoginWrapper>
            <Field>
              <input
                name="clinicEmail"
                placeholder="Email"
                type="text"
                required
                value={clinicLoginInfo.email}
                onChange={clinicLoginHandler("email")}
                style={{ height: "25px", width: "200px" }}
              />
            </Field>
            <Field>
              <input
                name="password"
                placeholder="Password"
                type="password"
                required
                value={clinicLoginInfo.password}
                onChange={clinicLoginHandler("password")}
                style={{ height: "25px", width: "200px" }}
              />
            </Field>

            <SubmitWrapper>
              <SubmitButton onClick={clinicSubmitFunction}>Submit</SubmitButton>
            </SubmitWrapper>

            {incorrectLogin && (
              <IncorrectLoginDiv>
                <IncorrectLoginText>
                  You have entered incorrect information. Please try again.
                </IncorrectLoginText>
              </IncorrectLoginDiv>
            )}

            {selectedClinic && (
              <Redirect to={`/clinic_profile/${selectedClinic._id}`} />
            )}
          </LoginWrapper>
        </Dropdown>
      </LoginDiv>

      <Signup>
        <SignupTitle>Not registered yet? </SignupTitle>
        <SignupText to={`/clinic_signup`}>
          Create a new clinic account
        </SignupText>
      </Signup>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  background-color: #085b67;
  overflow: auto;
`;

const LoginDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  text-align: center;
  font-size: 60px;
  font-weight: 600;
  margin: 100px 20px 20px 20px;
  color: white;
  cursor: pointer;
  text-shadow: 1px 1px 1px #000000;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 20px;
`;

const Field = styled.div`
  padding: 10px;
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

const IncorrectLoginDiv = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 300px;
  height: auto;
  background-color: #7c362c;
  border-radius: 3px;
  border: 1px solid black;
`;

const IncorrectLoginText = styled.p`
  font-size: 18px;
  font-weight: 500px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const Signup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const SignupTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const SignupText = styled(NavLink)`
  text-align: center;
  background-color: black;
  padding: 10px;
  border-radius: 3px;
  font-size: 30px;
  font-weight: 600;
  margin: 15px;
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

export default ClinicLogin;
