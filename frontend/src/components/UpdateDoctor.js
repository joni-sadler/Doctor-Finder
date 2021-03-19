import React, {useState, useEffect} from "react";
import styled, {keyframes} from "styled-components";
import {fadeInDown, fadeOutUp} from "react-animations";

const UpdateDoctor = ({selectedDoctor}) => {
    const [currentInfo, setCurrentInfo] = useState(selectedDoctor);
    const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);
    const [clinics, setClinics] = useState([]);
    const [primaryClinic, setPrimaryClinic] = useState();
    const [secondaryClinic, setSecondaryClinic] = useState();
    const [displayPrimaryClinicMenu, setDisplayPrimaryClinicMenu] = useState(false);
    const [displaySecondaryClinicMenu, setDisplaySecondaryClinicMenu] = useState(false);
  
    useEffect(() => {
      fetch(`/clinics`, {
        method: "GET",
      })
      .then((res) => res.json())
       .then((res) => setClinics(res.data));
    }, [])

    // console.log(selectedDoctor);
    console.log(selectedDoctor._id);
  
  
    const updateInfoHandler = (name) => {
      return ({ target: {value} }) => {
        setCurrentInfo((selectedDoctor) => ({ ...selectedDoctor, [name]: value }));
      }
    }
  
    const primaryClinicMenuHandler = () => {
      setDisplayPrimaryClinicMenu(!displayPrimaryClinicMenu);
      
    }
  
    const secondaryClinicMenuHandler = () => {
      setDisplaySecondaryClinicMenu(!displaySecondaryClinicMenu);
    }

    console.log(currentInfo);
  
  
    const submitFunction = () => {
      setHasSubmittedInfo(true);
      fetch(`/doctor_profile/${selectedDoctor._id}`, {
        method: "PUT",
        body: JSON.stringify({...currentInfo, primaryClinic, secondaryClinic}),
        headers: {"Accept": "application/json", "Content-type": "application/json"},
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          console.log(res.data)
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
            name="title"
            placeholder="Title"
            type="text"
            required
            value={currentInfo.title}
            onChange={updateInfoHandler("title")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="firstName"
            placeholder="First name"
            type="text"
            required
            value={currentInfo.firstName}
            onChange={updateInfoHandler("firstName")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="lastName"
            placeholder="Last name"
            type="text"
            required
            value={currentInfo.lastName}
            onChange={updateInfoHandler("lastName")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="email"
            placeholder="Email"
            type="text"
            required
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
        <ClinicDropdown>
          <Text onClick={primaryClinicMenuHandler}>Name of the clinic you are based at:</Text>
            {displayPrimaryClinicMenu &&
              <CategoryNav>
                {clinics.map((clinic) => {
                  return (
                    <ClinicList onClick={() => setPrimaryClinic(clinic.clinicName)}>{clinic.clinicName}</ClinicList>
                  )
                })}
              </CategoryNav>
            }
        </ClinicDropdown>        
        <ClinicDropdown>
          <Text onClick={secondaryClinicMenuHandler}>If you work at an additional clinic, please select it:</Text>
            {displaySecondaryClinicMenu &&
              <CategoryNav>
                {clinics.map((clinic) => {
                  return (
                    <ClinicList onClick={() => setSecondaryClinic(clinic.clinicName)}>{clinic.clinicName}</ClinicList>
                  ) 
                })}
              </CategoryNav>
            }
        </ClinicDropdown>
        <Field>
          <input
            name="specialty"
            placeholder="Do you specialize in a particular type of medicine?"
            type="text"
            required
            value={currentInfo.additionalClinicName}
            onChange={updateInfoHandler("specialty")}
            style={{ height: "25px", width: "400px"}}
          />
        </Field>
        <Field>
          <input
            name="password"
            placeholder="Set your password"
            type="password"
            required
            value={currentInfo.password}
            onChange={updateInfoHandler("password")}
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

export default UpdateDoctor;
