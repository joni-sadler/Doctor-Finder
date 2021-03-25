import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Map from "../components/Map";

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
    <Container>
      <MenuWrapper>
        <MenuText>All registered clinics in my area:</MenuText>
        {clinics.map((clinic) => {
          return (
            <ListItem to={`/clinics/${clinic._id}`} key={clinic._id}>
              {clinic.clinicName}
            </ListItem>
          );
        })}

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
      </MenuWrapper>
      <MapWrapper>
        <Map clinics={clinics} postalCode={postalCode} />
      </MapWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid blue;
  width: 100%;
  height: 100%;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid green;
  width: 500px;
`;

const MenuText = styled.p`
  font-size: 24px;
  font-weight: 600;
  padding: 0px 20px;
`;

const MapWrapper = styled.div`
  border: 1px solid purple;
  width: 70%;
`;

const ListItem = styled(NavLink)`
  font-size: 14px;
  font-weight: 600;
  padding: 0px 10px;
  margin: 10px 20px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const PostalCodePrompt = styled.p`
  font-size: 16px;
  font-weight: 600;
  padding: 40px 20px 0px 20px;
`;

const Field = styled.div`
  padding: 0px 20px;
`;

const PostalCodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
`;

const SubmitPostalCode = styled.button`
  padding: 5px;
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: 600;
  width: 100px;
`;

export default ClinicList;
