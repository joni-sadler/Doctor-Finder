import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Map from "../components/Map";
import Header from "../components/Header";

const ClinicList = () => {
  const [clinics, setClinics] = useState([]);
  const [postalCodeStorage, setPostalCodeStorage] = useState();
  const [postalCode, setPostalCode] = useState();

  useEffect(() => {
    fetch(`/clinics`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setClinics(res.data));
  }, []);

  clinics.sort(function (a, b) {
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
          <MenuText>All registered clinics in my area:</MenuText>
          <ListItemContainer>
            {clinics.map((clinic) => {
              return (
                <ListItem to={`/clinics/${clinic._id}`} key={clinic._id}>
                  {clinic.clinicName}
                </ListItem>
              );
            })}
          </ListItemContainer>
          <PostalCodePrompt>
            Enter your postal code to find your nearest clinic:
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
          {postalCode && (
            <PostalCodeText>
              The blue marker on the map indicates your location.
            </PostalCodeText>
          )}
        </MenuWrapper>
        <MapWrapper>
          <Map clinics={clinics} postalCode={postalCode} />
        </MapWrapper>
      </Container>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: #085b67;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const MenuText = styled.p`
  font-size: 40px;
  font-weight: 600;
  padding: 0px 20px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const MapWrapper = styled.div`
  border: 1px solid black;
  width: 60%;
  height: 80%;
  margin: 20px;
`;

const ListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  background-color: white;
  border-radius: 3px;
  overflow-y: auto;
  margin-left: 20px;
`;

const ListItem = styled(NavLink)`
  font-size: 16px;
  font-weight: 600;
  padding: 10px 0px 10px 25px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const PostalCodePrompt = styled.p`
  font-size: 20px;
  font-weight: 600;
  padding: 40px 20px 20px 20px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
`;

const Field = styled.div`
  border-radius: 3px;
  padding-right: 20px;
`;

const PostalCodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
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

const PostalCodeText = styled.p`
  font-size: 18px;
  color: white;
  text-shadow: 1px 1px 1px #000000;
  margin: 40px 20px;
`;

export default ClinicList;
