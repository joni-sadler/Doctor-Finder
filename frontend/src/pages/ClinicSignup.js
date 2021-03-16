import React, {useState} from "react";
import styled from "styled-components";

const ClinicSignup = () => {
  const [signupInfo, setSignupInfo] = useState({});
  const [acceptsPatients, setAcceptsPatients] = useState(false);
  const [acceptsWalkIns, setAcceptsWalkIns] = useState(false);
  const [canBookAppointments, setCanBookAppointments] = useState(false);
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);

  const clinicNameHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const clinicAddressHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const emailHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const phoneNumberHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const openingHoursHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const specialtiesHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const passwordHandler = (name) => {
    return ({ target: {value} }) => {
      setSignupInfo((signupInfo) => ({ ...signupInfo, [name]: value }));
    }
  }

  const acceptingPatientsHandlerTrue = () => {
    setAcceptsPatients(true)
  }

  const acceptingWalkInHandlerTrue = () => {
    setAcceptsWalkIns(true)
  }

  const acceptingAppointmentsHandlerTrue = () => {
      setCanBookAppointments(true)
  }

  const submitFunction = () => {
    setHasSubmittedInfo(true);
    console.log(signupInfo);
    fetch("/clinic_signup", {
      method: "POST",
      body: JSON.stringify({
          ...signupInfo, 
          acceptsPatients: acceptsPatients,
          acceptsWalkIns: acceptsWalkIns,
          canBookAppointments: canBookAppointments
        }),
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
            name="clinicName"
            placeholder="Name of your clinic"
            type="text"
            value={signupInfo.clinicName}
            onChange={clinicNameHandler("clinicName")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="clinicAddress"
            placeholder="Address of your clinic"
            type="text"
            value={signupInfo.clinicAddress}
            onChange={clinicAddressHandler("clinicAddress")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="email"
            placeholder="Email"
            type="text"
            value={signupInfo.email}
            onChange={emailHandler("email")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="phoneNumber"
            placeholder="Phone number"
            type="text"
            required
            value={signupInfo.phoneNumber}
            onChange={phoneNumberHandler("phoneNumber")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="hours"
            placeholder="What are your opening hours?"
            type="text"
            value={signupInfo.hours}
            onChange={openingHoursHandler("hours")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="specialties"
            placeholder="Does your clinic offer any special services? Please list them."
            type="text"
            value={signupInfo.specialties}
            onChange={specialtiesHandler("specialties")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="password"
            placeholder="Set your password"
            type="password"
            value={signupInfo.password}
            onChange={passwordHandler("password")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <p>Are any of your doctors accepting new patients?</p>
          <input 
            name="acceptsPatients"
            type="radio"
            value="True"
            onChange={acceptingPatientsHandlerTrue}
          /> Yes
          <input 
            name="acceptsPatients"
            type="radio"
            value="False"
          /> No
        </Field>
        <Field>
          <p>Do you accept walk-ins?</p>
          <input 
            name="acceptsWalkins"
            type="radio"
            value="True"
            onChange={acceptingWalkInHandlerTrue}
          /> Yes
          <input 
            name="acceptsWalkins"
            type="radio"
            value="False"
          /> No
        </Field>
        <Field>
          <p>Can patients book an appointment in advance at your clinic?</p>
          <input 
            name="acceptsAppointments"
            type="radio"
            value="True"
            onChange={acceptingAppointmentsHandlerTrue}
          /> Yes
          <input 
            name="acceptsAppointments"
            type="radio"
            value="False"
          /> No
        </Field>
        <SubmitWrapper>
          <SubmitButton onClick={submitFunction}>
            Submit
          </SubmitButton>
        </SubmitWrapper>
      </SignupWrapper>
      {hasSubmittedInfo &&
          <div>
            <RegistrationMessaging>Thank you for registering! Your info is now securely stored in our database.</RegistrationMessaging>
          </div>
        }
    </Container>
  )
}

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vw;
  width: 100%;
`;

const Title = styled.p` 
  font-size: 40px;
  font-weight: 600;
  margin: 10px;
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

const RegistrationMessaging = styled.p` 
  font-size: 20px;
  font-weight: 600;
`;

export default ClinicSignup;
