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

const WalkInClinics = () => {
  const [walkInClinics, setWalkInClinics] = useState([]);
  const [postalCodeStorage, setPostalCodeStorage] = useState();
  const [postalCode, setPostalCode] = useState();

  useEffect(() => {
    fetch(`/walk_in_clinics`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setWalkInClinics(res.data));
  }, []);

  walkInClinics.sort(function (a, b) {
    if (a.clinicName < b.clinicName) {
      return -1;
    }
    if (a.clinicName > b.clinicName) {
      return 1;
    }
    return 0;
  });

  return (
    <PageWrapper>
      <Header />
      <Container>
        <MenuWrapper>
          <MenuText>Walk-In Clinics:</MenuText>
          <ListItemContainer>
            {walkInClinics.map((walkInClinic) => {
              return (
                <ListItem
                  to={`/clinics/${walkInClinic._id}`}
                  key={walkInClinic._id}
                >
                  {walkInClinic.clinicName}
                </ListItem>
              );
            })}
          </ListItemContainer>
          <PostalCodePrompt>
            Enter your postal code to find the nearest clinic:
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
          <Map walkInClinics={walkInClinics} postalCode={postalCode} />
        </MapWrapper>
      </Container>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #085b67;
`;

const Container = styled.div`
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
    font-size: 30px;
  }
`;

const ListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  background-color: white;
  border-radius: 3px;
  overflow-y: auto;
  margin-left: 20px;
  width: 80%;
  ${onDesktopMediaQuery()} {
    margin-left: 5%;
  }
  ${onTabletMediaQuery()} {
    max-height: 250px;
    margin-left: 5%;
    width: 100%;
  }
  ${onSmallPhoneMediaQuery()} {
    max-height: 125px;
    margin-left: 5%;
    width: 100%;
  }
`;

const ListItem = styled(NavLink)`
  font-size: 16px;
  font-weight: 600;
  padding: 10px 0px 10px 25px;
  color: black;
  text-decoration: none;
  cursor: pointer;
  ${onDesktopMediaQuery()} {
    padding: 10px 0px 10px 15px;
  }
  ${onTabletMediaQuery()} {
    padding: 10px 0px 10px 15px;
  }
  ${onSmallPhoneMediaQuery()} {
    padding: 10px 0px 10px 15px;
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

const Field = styled.div`
  border-radius: 3px;
  padding-right: 20px;
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

const PostalCodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 3%;
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

const MapWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  margin: 20px;
  ${onDesktopMediaQuery()} {
    height: 100%;
    width: 90%;
    margin: 5%;
  }
  ${onTabletMediaQuery()} {
    height: 100%;
    width: 90%;
    margin: 5%;
  }
  ${onSmallPhoneMediaQuery()} {
    height: 100%;
    width: 90%;
    margin: 5%;
  }
`;

export default WalkInClinics;
