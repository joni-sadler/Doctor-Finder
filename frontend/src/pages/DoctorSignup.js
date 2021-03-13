import React, {useState} from "react";
import styled from "styled-components";

const DoctorSignup = () => {
  const [signupInfo, setSignupInfo] = useState({});

  const titleHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const firstNameHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const lastNameHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const emailHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const clinicNameHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const additionalClinicNameHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const passwordHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }


  const submitFunction = () => {
    console.log(signupInfo);
    fetch("/doctor_signup", {
      method: "POST",
      body: JSON.stringify({...signupInfo}),
      headers: {"Accept": "application/json", "Content-type": "application/json"},
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        setSignupInfo(res.data)
      } else {
        console.log("There is an error with the post request.")
      }
    })
  }


  return (
    <Container>
      <Title>Signup</Title>
        <SignupWrapper>
        <Field>
          <input
            name="title"
            placeholder="Title"
            type="text"
            required
            value={signupInfo.title}
            onChange={titleHandler("title")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="firstName"
            placeholder="First Name"
            type="text"
            required
            value={signupInfo.firstName}
            onChange={firstNameHandler("firstName")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="lastName"
            placeholder="Last Name"
            type="text"
            required
            value={signupInfo.lastName}
            onChange={lastNameHandler("lastName")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="email"
            placeholder="Email"
            type="text"
            required
            value={signupInfo.email}
            onChange={emailHandler("email")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="clinicName"
            placeholder="Name of your clinic"
            type="text"
            required
            value={signupInfo.clinicName}
            onChange={clinicNameHandler("clinicName")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="additionalClinic"
            placeholder="If you work at multiple clinics, list additional ones here"
            type="text"
            required
            value={signupInfo.additionalClinicName}
            onChange={additionalClinicNameHandler("additionalClinic")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="password"
            placeholder="Set your password"
            type="password"
            required
            value={signupInfo.password}
            onChange={passwordHandler("password")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <SubmitWrapper>
          <SubmitButton onClick={submitFunction}>
            Submit
          </SubmitButton>
        </SubmitWrapper>
      </SignupWrapper>
    </Container>
  )
}

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vw;
  width: 100%;
`;

const Title = styled.p` 
  font-size: 40px;
  font-weight: 600;
`;

const SignupWrapper = styled.div` 
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

export default DoctorSignup;
