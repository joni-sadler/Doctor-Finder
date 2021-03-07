import React, {useState} from "react";
import styled from "styled-components";

const ProviderPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const firstNameHandler = (name) => {
    return ({ target: {value} }) => {
      setLoginInfo((oldValues) => ({ ...oldValues, [name]: value }));
    }
  }

  const lastNameHandler = (name) => {
    return ({ target: {value} }) => {
      setLoginInfo((oldValues) => ({ ...oldValues, [name]: value }));
    }
  }

  const passwordHandler = (name) => {
    return ({ target: {value} }) => {
      setLoginInfo((oldValues) => ({ ...oldValues, [name]: value }));
    }
  }

  const submitFunction = () => {
    // submit info
    console.log(loginInfo);
    // determine if login info is in database
  }

  return (
    <Container>
      <Title>Login</Title>
      <LoginWrapper>
        <Field>
          <input
            name="firstName"
            placeholder="First Name"
            type="text"
            required
            value={loginInfo.firstName}
            onChange={firstNameHandler("firstName")}
            style={{ height: "25px", width: "200px"}}
          />
        </Field>
        <Field>
          <input
            name="lastName"
            placeholder="Last Name"
            type="text"
            required
            value={loginInfo.lastName}
            onChange={lastNameHandler("lastName")}
            style={{ height: "25px", width: "200px"}}
          />
        </Field>
        <Field>
          <input
            name="password"
            placeholder="Password"
            type="text"
            required
            value={loginInfo.password}
            onChange={passwordHandler("password")}
            style={{ height: "25px", width: "200px"}}
          />
        </Field>
        <SubmitWrapper>
          <SubmitButton onClick={submitFunction}>
            Submit
          </SubmitButton>
        </SubmitWrapper>
      </LoginWrapper>
    </Container>
  )
}

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  height: 50vw;
  width: 100%;
`;

const Title = styled.p` 
  font-size: 40px;
  font-weight: 600;
`;

const LoginWrapper = styled.div` 
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

export default ProviderPage;
