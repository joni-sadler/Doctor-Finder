import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";
import Home from "./pages/Home";
import About from "./pages/About";
import Faq from "./pages/Faq";
import DoctorLogin from "./pages/DoctorLogin";
import HealthcareFinder from "./pages/HealthcareFinder";
import DoctorSignup from "./pages/DoctorSignup";
import ClinicSignup from "./pages/ClinicSignup";
import WalkInClinics from "./pages/WalkInClinics";
import AppointmentClinics from "./pages/AppointmentClinics";
import FamilyDoctor from "./pages/FamilyDoctor";
import Clinic from "./pages/Clinic";
import ClinicList from "./pages/ClinicList";
import DoctorList from "./pages/DoctorList";
import Doctor from "./pages/Doctor";
import DoctorHomePage from "./pages/DoctorHomePage";
import ClinicHomePage from "./pages/ClinicHomePage";
import DeleteAccount from "./pages/DeleteAccount";
import Specialty from "./pages/Specialty";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/faq">
            <Faq />
          </Route>
          <Route exact path="/login">
            <DoctorLogin />
          </Route>
          <Route exact path="/healthcare_finder">
            <HealthcareFinder />
          </Route>
          <Route exact path="/doctor_signup">
            <DoctorSignup />
          </Route>
          <Route exact path="/clinic_signup">
            <ClinicSignup />
          </Route>
          <Route exact path="/walk_in_clinics">
            <WalkInClinics />
          </Route>
          <Route exact path="/clinic_appointments">
            <AppointmentClinics />
          </Route>
          <Route path="/clinics/:clinic">
            <Clinic />
          </Route>
          <Route exact path="/clinics">
            <ClinicList />
          </Route>
          <Route path="/clinic_profile/:clinic">
            <ClinicHomePage />
          </Route>
          <Route exact path="/doctor_finder">
            <FamilyDoctor />
          </Route>
          <Route exact path="/doctors">
            <DoctorList />
          </Route>
          <Route path="/doctors/:doctor">
            <Doctor />
          </Route>
          <Route path="/doctor_profile/:doctor">
            <DoctorHomePage />
          </Route>
          <Route path="/specialty/:specialty">
            <Specialty />
          </Route>
          <Route exact path="/account_deleted">
            <DeleteAccount />
          </Route>
        </Switch>
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  display: flex;
  height: 60vw;
`;

export default App;
