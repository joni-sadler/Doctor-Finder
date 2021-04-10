import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { onSmallPhoneMediaQuery } from "../utils/responsive";

const SearchBar = () => {
  // Retrieve all doctors from Redux state
  const searchArrayDoctors = useSelector((state) => state.doctors.doctors);

  // Set initial search term to an empty string
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("close");

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search for a doctor"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setStatus("open");
        }}
      />
      {status === "open" && (
        <SearchList>
          {searchArrayDoctors
            .filter((doctor) => {
              if (searchTerm === "") {
                return false;
              } else if (
                doctor.firstName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return true;
              }
              return false;
            })
            .map((doctor, i) => {
              return (
                <Dropdown>
                  <DoctorLink
                    onClick={() => {
                      setStatus("close");
                      setSearchTerm("");
                    }}
                    to={`/doctors/${doctor._id}`}
                    key={i}
                  >
                    {doctor.title} {doctor.firstName} {doctor.lastName}
                  </DoctorLink>
                </Dropdown>
              );
            })}
        </SearchList>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  border: none;
  outline: none;
  margin: 5% 5% 0 5%;
  border-bottom: 2px solid black;
  ${onSmallPhoneMediaQuery()} {
    width: 175px;
    height: 10px;
  }
`;

const SearchList = styled.div`
  margin-left: 15px;
  background-color: white;
  border: 1px solid black;
  z-index: 5;
  ${onSmallPhoneMediaQuery()} {
    width: 175px;
  }
`;

const Dropdown = styled.div`
  padding: 10px 5px;
  text-align: left;
  background-color: white;
  &:hover {
    cursor: pointer;
    background: #dbe7e9;
  }
`;

const DoctorLink = styled(NavLink)`
  padding: 10px 0px;
  text-align: left;
  height: 10px;
  color: black;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    background: #dbe7e9;
  }
`;

export default SearchBar;
