import React, { useState } from "react";
import styled from "styled-components";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const UpdateClinic = ({ selectedClinic }) => {
  const [currentInfo, setCurrentInfo] = useState(selectedClinic);
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);
  const [acceptsPatients, setAcceptsPatients] = useState(false);
  const [acceptsWalkIns, setAcceptsWalkIns] = useState(false);
  const [canBookAppointments, setCanBookAppointments] = useState(false);

  const updateInfoHandler = (name) => {
    return ({ target: { value } }) => {
      setCurrentInfo((selectedDoctor) => ({
        ...selectedDoctor,
        [name]: value,
      }));
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
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setCurrentInfo(res.data);
        } else {
          console.log("There is an error with the post request.");
        }
      });
  };

  return (
    <Container>
      <SignupWrapper>
        <Title>Update Your Profile</Title>
        <Field>
          <input
            name="clinicName"
            placeholder="Name of your clinic"
            type="text"
            value={currentInfo.clinicName}
            onChange={updateInfoHandler("clinicName")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <input
            name="clinicAddress"
            placeholder="Address of your clinic"
            type="text"
            value={currentInfo.clinicAddress}
            onChange={updateInfoHandler("clinicAddress")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <input
            name="email"
            placeholder="Email"
            type="text"
            value={currentInfo.email}
            onChange={updateInfoHandler("email")}
            style={{ height: "25px", width: "90%" }}
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
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <input
            name="hours"
            placeholder="What are your opening hours?"
            type="text"
            value={currentInfo.hours}
            onChange={updateInfoHandler("hours")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <input
            name="specialties"
            placeholder="Does your clinic offer any special services? Please list them."
            type="text"
            value={currentInfo.specialties}
            onChange={updateInfoHandler("specialties")}
            style={{ height: "25px", width: "90%" }}
          />
        </Field>
        <Field>
          <input
            name="password"
            placeholder="Set your password"
            type="password"
            value={currentInfo.password}
            onChange={updateInfoHandler("password")}
            style={{ height: "25px", width: "90%" }}
          />
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
          <p>Can patients book an appointment in advance at your clinic?</p>
          <input
            name="acceptsAppointments"
            type="radio"
            value="True"
            onChange={acceptingAppointmentsHandlerTrue}
          />{" "}
          Yes
          <input name="acceptsAppointments" type="radio" value="False" /> No
        </Field>
        <SubmitWrapper>
          <SubmitButton onClick={submitFunction}>Submit</SubmitButton>
        </SubmitWrapper>

        {hasSubmittedInfo && (
          <SubmitConfirmation>
            <SubmitMessage>Your profile has been updated.</SubmitMessage>
          </SubmitConfirmation>
        )}
      </SignupWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  ${onDesktopMediaQuery()} {
    margin: 10px 0px 0px 0px;
  }
  ${onTabletMediaQuery()} {
    font-size: 34px;
    margin: 10px 0px 0px 0px;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 30px;
    margin: 10px 0px;
    padding: 0px;
  }
`;

const SignupWrapper = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  border-radius: 3px;
  padding: 20px;
  background-color: white;
  overflow-y: auto;
  margin-top: 2%;
  ${onDesktopMediaQuery()} {
    flex-direction: column;
    justify-content: flex-start;
  }
  ${onTabletMediaQuery()} {
    height: 100%;
    width: 100%;
  }
  ${onSmallPhoneMediaQuery()} {
    height: 100%;
    width: 90%;
  }
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

const SubmitConfirmation = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SubmitMessage = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 20px;
`;

export default UpdateClinic;
