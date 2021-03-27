import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect, NavLink } from "react-router-dom";

const DoctorLogin = () => {
  const [doctorLoginInfo, setDoctorLoginInfo] = useState({});
  const [doctorArray, setDoctorArray] = useState([]);
  const [clinicArray, setClinicArray] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [selectedClinic, setSelectedClinic] = useState();

  useEffect(() => {
    fetch(`/doctors`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setDoctorArray(res.data));
  }, []);

  useEffect(() => {
    fetch(`/clinics`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setClinicArray(res.data));
  }, []);

  const doctorLoginHandler = (name) => {
    return ({ target: { value } }) => {
      setDoctorLoginInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    };
  };

  const doctorSubmitFunction = () => {
    doctorArray.forEach((doctor) => {
      if (
        doctorLoginInfo.email === doctor.email &&
        doctorLoginInfo.password === doctor.password
      ) {
        setSelectedDoctor(doctor);
      }
    });
  };

  return (
    <Container>
      <LoginDiv>
        <Dropdown>
          <Title>Doctor Login</Title>
          <LoginWrapper>
            <Field>
              <input
                name="doctorEmail"
                placeholder="Email"
                type="text"
                required
                value={doctorLoginInfo.email}
                onChange={doctorLoginHandler("email")}
                style={{ height: "25px", width: "200px" }}
              />
            </Field>
            <Field>
              <input
                name="password"
                placeholder="Password"
                type="password"
                required
                value={doctorLoginInfo.password}
                onChange={doctorLoginHandler("password")}
                style={{ height: "25px", width: "200px" }}
              />
            </Field>

            <SubmitWrapper>
              <SubmitButton onClick={doctorSubmitFunction}>Submit</SubmitButton>
            </SubmitWrapper>

            {selectedDoctor && (
              <Redirect to={`/doctor_profile/${selectedDoctor._id}`} />
            )}
          </LoginWrapper>
        </Dropdown>
      </LoginDiv>

      <Signup>
        <SignupTitle>Not registered yet? </SignupTitle>
        <SignupText to={`/doctor_signup`}>
          Create a new doctor account
        </SignupText>
      </Signup>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  background-color: #085b67;
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
  font-size: 60px;
  font-weight: 600;
  margin: 20px;
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

export default DoctorLogin;
