import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Redirect, NavLink} from "react-router-dom";

const HealthcareLogin = () => {
  const [displayDoctorLogin, setDisplayDoctorLogin] = useState(false);
  const [displayClinicLogin, setDisplayClinicLogin] = useState(false);
  const [doctorLoginInfo, setDoctorLoginInfo] = useState({});
  const [clinicLoginInfo, setClinicLoginInfo] = useState({});
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
  }, [])

  useEffect(() => {
    fetch(`/clinics`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => setClinicArray(res.data));
  }, [])

  const displayDoctorLoginFunction = () => {
    setDisplayDoctorLogin(!displayDoctorLogin);
    setDisplayClinicLogin(false);
  }

  const displayClinicLoginFunction = () => {
    setDisplayClinicLogin(!displayClinicLogin);
    setDisplayDoctorLogin(false);
  }

  const doctorLoginHandler = (name) => {
    return ({ target: {value} }) => {
      setDoctorLoginInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }


  const clinicLoginHandler = (name) => {
    return ({ target: {value} }) => {
      setClinicLoginInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }


  const doctorSubmitFunction = () => {
    doctorArray.forEach((doctor) => {
      if (doctorLoginInfo.email === doctor.email && doctorLoginInfo.password === doctor.password) {
        setSelectedDoctor(doctor);
      }
    })
  }


  const clinicSubmitFunction = () => {
    clinicArray.forEach((clinic) => {
      if (clinicLoginInfo.email === clinic.email && clinicLoginInfo.password === clinic.password) {
        setSelectedClinic(clinic);
        console.log(selectedClinic);
      }
    })
  }

  return (
    <Container>
      <LoginDiv>
        <Dropdown>
          <Title onClick={displayDoctorLoginFunction}>Doctor Login</Title>
          {displayDoctorLogin &&
            <LoginWrapper>
              <Field>
                <input
                  name="doctorEmail"
                  placeholder="Email"
                  type="text"
                  required
                  value={doctorLoginInfo.email}
                  onChange={doctorLoginHandler("email")}
                  style={{ height: "25px", width: "200px"}}
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
                  style={{ height: "25px", width: "200px"}}
                />
              </Field>   

              <SubmitWrapper>
                <SubmitButton onClick={doctorSubmitFunction}>Submit</SubmitButton>
              </SubmitWrapper>

              {selectedDoctor &&
              <Redirect to={`/${selectedDoctor._id}/home`}/>     
              }

            </LoginWrapper>
          }
        </Dropdown>

        <Dropdown>
          <Title onClick={displayClinicLoginFunction}>Clinic Administrator Login</Title>
          {displayClinicLogin &&
            <LoginWrapper>
              <Field>
                <input
                  name="clinicEmail"
                  placeholder="Email"
                  type="text"
                  required
                  value={clinicLoginInfo.email}
                  onChange={clinicLoginHandler("email")}
                  style={{ height: "25px", width: "200px"}}
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
  height: auto;
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
