import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

const SearchBar = () => {
  const searchArrayDoctors = useSelector((state) => state.doctors.doctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("close");

  console.log(searchArrayDoctors);

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
                return null;
              } else if (
                doctor.firstName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return doctor;
              }
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
  border-bottom: 2px solid black;
  ${onSmallPhoneMediaQuery()} {
    width: 175px;
    height: 10px;
  }
`;

const SearchList = styled.div`
  max-height: 150px;
  margin-left: 15px;
  background-color: white;
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
