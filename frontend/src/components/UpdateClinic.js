import React, {useState, useEffect} from "react";
import styled, {keyframes} from "styled-components";
import {fadeInDown, fadeOutUp} from "react-animations";

const UpdateClinic = ({selectedClinic}) => {
  const [currentInfo, setCurrentInfo] = useState(selectedClinic);
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);
  const [acceptsPatients, setAcceptsPatients] = useState(false);
  const [acceptsWalkIns, setAcceptsWalkIns] = useState(false);
  const [canBookAppointments, setCanBookAppointments] = useState(false);
  
  const updateInfoHandler = (name) => {
    return ({ target: {value} }) => {
      setCurrentInfo((selectedDoctor) => ({ ...selectedDoctor, [name]: value }));
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
    fetch(`/clinic_profile/${selectedClinic._id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...currentInfo, 
        acceptsPatients,
        acceptsWalkIns,
        canBookAppointments,
    }),
    headers: {"Accept": "application/json", "Content-type": "application/json"},
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        setCurrentInfo(res.data)
      } else {
        console.log("There is an error with the post request.")
      }
    })
  }

  return (
    <Container>
      <SignupWrapper>
        <Field>
          <input
            name="clinicName"
            placeholder="Name of your clinic"
            type="text"
            value={currentInfo.clinicName}
            onChange={updateInfoHandler("clinicName")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="clinicAddress"
            placeholder="Address of your clinic"
            type="text"
            value={currentInfo.clinicAddress}
            onChange={updateInfoHandler("clinicAddress")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="email"
            placeholder="Email"
            type="text"
            value={currentInfo.email}
            onChange={updateInfoHandler("email")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="phoneNumber"
            placeholder="Phone number"
            type="text"
            required
            value={currentInfo.phoneNumber}
            onChange={updateInfoHandler("phoneNumber")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="hours"
            placeholder="What are your opening hours?"
            type="text"
            value={currentInfo.hours}
            onChange={updateInfoHandler("hours")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="specialties"
            placeholder="Does your clinic offer any special services? Please list them."
            type="text"
            value={currentInfo.specialties}
            onChange={updateInfoHandler("specialties")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="password"
            placeholder="Set your password"
            type="password"
            value={currentInfo.password}
            onChange={updateInfoHandler("password")}
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
            <SubmitButton onClick={submitFunction}>Submit</SubmitButton>
            </SubmitWrapper>
          </SignupWrapper>
          {hasSubmittedInfo &&
            <div>
              <RegistrationMessaging>Your account has been updated.</RegistrationMessaging>
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
  height: 100%;
  width: 100%;
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

const Text = styled.p`
  margin-left: 10px;
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
  max-height: 300px;
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
`;

const RegistrationMessaging = styled.p` 
  font-size: 20px;
  font-weight: 600;
  margin: 20px;
`;

export default UpdateClinic;