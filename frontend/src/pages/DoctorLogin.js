import React, {useState} from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const HealthcareLogin = () => {
  const [displayDoctorLogin, setDisplayDoctorLogin] = useState(false);
  const [displayClinicLogin, setDisplayClinicLogin] = useState(false);

  const [doctorLoginInfo, setDoctorLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [clinicLoginInfo, setClinicLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleDoctorLogin = () => {
    setDisplayDoctorLogin(!displayDoctorLogin);
    setDisplayClinicLogin(false);
  }

  const handleClinicLogin = () => {
    setDisplayClinicLogin(!displayClinicLogin);
    setDisplayDoctorLogin(false);
  }

  const doctorEmailHandler = (name) => {
    return ({ target: {value} }) => {
      setDoctorLoginInfo((oldValues) => ({ ...oldValues, [name]: value }));
    }
  }

  const doctorPasswordHandler = (name) => {
    return ({ target: {value} }) => {
      setDoctorLoginInfo((oldValues) => ({ ...oldValues, [name]: value }));
    }
  }

  const clinicEmailHandler = (name) => {
    return ({ target: {value} }) => {
      setClinicLoginInfo((oldValues) => ({ ...oldValues, [name]: value }));
    }
  }

  const clinicPasswordHandler = (name) => {
    return ({ target: {value} }) => {
      setClinicLoginInfo((oldValues) => ({ ...oldValues, [name]: value }));
    }
  }

  const doctorSubmitFunction = () => {
    // submit info
    console.log(doctorLoginInfo);

    // determine if login info is in database
  }

  const clinicSubmitFunction = () => {
    // submit info
    console.log(clinicLoginInfo);
    // determine if login info is in database
  }

  return (
    <Container>
      <LoginDiv>
        <Dropdown>
          <Title onClick={handleDoctorLogin}>Doctor Login</Title>
          {displayDoctorLogin &&
            <LoginWrapper>
              <Field>
                <input
                  name="doctorEmail"
                  placeholder="Email"
                  type="text"
                  required
                  value={doctorLoginInfo.email}
                  onChange={doctorEmailHandler("email")}
                  style={{ height: "25px", width: "200px"}}
                />
              </Field>
              <Field>
                <input
                  name="password"
                  placeholder="Password"
                  type="text"
                  required
                  value={doctorLoginInfo.password}
                  onChange={doctorPasswordHandler("password")}
                  style={{ height: "25px", width: "200px"}}
                />
              </Field>
              <SubmitWrapper>
                <SubmitButton onClick={doctorSubmitFunction}>Submit</SubmitButton>
              </SubmitWrapper>
            </LoginWrapper>
          }
        </Dropdown>

        <Dropdown>
          <Title onClick={handleClinicLogin}>Clinic Administrator Login</Title>
          {displayClinicLogin &&
            <LoginWrapper>
              <Field>
                <input
                  name="clinicEmail"
                  placeholder="Email"
                  type="text"
                  required
                  value={clinicLoginInfo.email}
                  onChange={clinicEmailHandler("email")}
                  style={{ height: "25px", width: "200px"}}
                />
              </Field>
              <Field>
                <input
                  name="password"
                  placeholder="Password"
                  type="text"
                  required
                  value={clinicLoginInfo.password}
                  onChange={clinicPasswordHandler("password")}
                  style={{ height: "25px", width: "200px"}}
                />
              </Field>
              <SubmitWrapper>
                <SubmitButton onClick={clinicSubmitFunction}>Submit</SubmitButton>
              </SubmitWrapper>
            </LoginWrapper>
           }
        </Dropdown>
      </LoginDiv>

      <Signup>
        <SignupTitle>Not registered yet? </SignupTitle>
        <SignupText to={`/doctor_signup`}>Click here to sign up as a health practitioner</SignupText>
        <SignupText to={`/clinic_signup`}>Click here to register a clinic</SignupText>
      </Signup>
    </Container>
  )
}

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vw;
  width: 100%;
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
  font-size: 40px;
  font-weight: 600;
  margin: 50px;
  cursor: pointer;
`;

const LoginWrapper = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
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
`;

const SignupText = styled(NavLink)` 
  font-size: 18px;
  font-weight: 600;
  margin: 15px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

export default HealthcareLogin;
