import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Map from "../components/Map";
import Header from "../components/Header";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const FamilyDoctor = () => {
  const [acceptingPatients, setAcceptingPatients] = useState([]);
  const [postalCodeStorage, setPostalCodeStorage] = useState();
  const [postalCode, setPostalCode] = useState();

  // Get all clinics with at least one doctor who is currently accepting new patients
  useEffect(() => {
    fetch(`/doctor_finder`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setAcceptingPatients(res.data));
  }, []);

  // Sort clinics alphabetically
  acceptingPatients.sort(function (a, b) {
    if (a.clinicName < b.clinicName) {
      return -1;
    }
    if (a.clinicName > b.clinicName) {
      return 1;
    }
    return 0;
  });

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <MenuWrapper>
          <MenuText>Clinics with doctors accepting new patients:</MenuText>
          <ListItemContainer>
            {acceptingPatients.map((acceptingPatients) => {
              return (
                <ListItem
                  to={`/clinics/${acceptingPatients._id}`}
                  key={acceptingPatients._id}
                >
                  {acceptingPatients.clinicName}
                </ListItem>
              );
            })}
          </ListItemContainer>
          <PostalCodePrompt>
            Enter your postal code to display your current location:
          </PostalCodePrompt>
          <PostalCodeWrapper>
            <Field>
              <input
                name="postalCode"
                placeholder="Enter your postal code"
                type="text"
                value={postalCodeStorage}
                onChange={(e) => setPostalCodeStorage(e.target.value)}
                style={{ height: "30px", width: "150px" }}
              />
            </Field>
            <SubmitPostalCode onClick={() => setPostalCode(postalCodeStorage)}>
              Submit
            </SubmitPostalCode>
          </PostalCodeWrapper>
        </MenuWrapper>
        <MapWrapper>
          <Map acceptingPatients={acceptingPatients} postalCode={postalCode} />
        </MapWrapper>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #085b67;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 90%;
  ${onDesktopMediaQuery()} {
    flex-direction: column;
    justify-content: flex-start;
  }
  ${onTabletMediaQuery()} {
    flex-direction: column;
    height: 100%;
  }
  ${onSmallPhoneMediaQuery()} {
    flex-direction: column;
    height: 100%;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const MenuText = styled.p`
  font-size: 40px;
  font-weight: 600;
  padding: 0px 20px;
  width: 100%;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  ${onDesktopMediaQuery()} {
    margin-left: 5%;
  }
  ${onTabletMediaQuery()} {
    margin-left: 5%;
  }
  ${onSmallPhoneMediaQuery()} {
    font-size: 30px;
    margin-left: 5%;
    padding: 0px;
  }
`;

const MapWrapper = styled.div`
  border: 1px solid black;
  width: 90%;
  height: 90%;
  margin: 2% 2% 2% 5%;
  overflow-y: hidden;
  ${onDesktopMediaQuery()} {
    height: 50%;
    width: 90%;
    margin: 5%;
  }
  ${onTabletMediaQuery()} {
    height: 50%;
    width: 90%;
    margin-bottom: 5%;
  }
  ${onSmallPhoneMediaQuery()} {
    height: 100%;
    width: 90%;
    margin-bottom: 5%;
  }
`;

const ListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  width: 70%;
  background-color: white;
  border-radius: 3px;
  overflow-y: auto;
  margin-left: 5%;
  ${onDesktopMediaQuery()} {
    margin-left: 5%;
  }
  ${onTabletMediaQuery()} {
    max-height: 250px;
    margin-left: 5%;
  }
  ${onSmallPhoneMediaQuery()} {
    max-height: 150px;
    margin-left: 5%;
    width: 100%;
  }
`;

const ListItem = styled(NavLink)`
  font-size: 16px;
  font-weight: 600;
  padding: 0px 10px;
  margin: 10px 20px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const Field = styled.div`
  border-radius: 3px;
  padding-right: 20px;
  margin-left: 5%;
  ${onDesktopMediaQuery()} {
    margin-left: 5%;
  }
  ${onTabletMediaQuery()} {
    margin-left: 5%;
  }
  ${onSmallPhoneMediaQuery()} {
    margin-left: 5%;
  }
`;

const PostalCodePrompt = styled.p`
  font-size: 20px;
  font-weight: 600;
  padding: 40px 20px 20px 20px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  ${onDesktopMediaQuery()} {
    margin-left: 5%;
  }
  ${onTabletMediaQuery()} {
    margin-left: 5%;
  }
  ${onSmallPhoneMediaQuery()} {
    margin-left: 5%;
    padding: 0px;
    font-size: 18px;
  }
`;

const PostalCodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${onDesktopMediaQuery()} {
    margin-left: 5%;
  }
  ${onTabletMediaQuery()} {
    margin-left: 5%;
  }
  ${onSmallPhoneMediaQuery()} {
    padding-left: 0px;
    margin-left: 0px;
  }
`;

const SubmitPostalCode = styled.button`
  padding: 5px;
  background-color: black;
  border-radius: 3px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  width: 100px;
`;

export default FamilyDoctor;
