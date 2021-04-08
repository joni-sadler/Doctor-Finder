import {
  loadingDoctors,
  receiveDoctors,
  errorDoctors,
  doctorLogin,
  doctorLogout,
  errorDoctorLogin,
  clinicLogin,
  errorClinicLogin,
  clinicLogout,
} from "../../actions";

// Receive entire list of doctors to populate search bar in header
export const handleFetchDoctors = (dispatch) => {
  dispatch(loadingDoctors());
  return fetch("/doctors")
    .then((res) => res.json())
    .then((res) => dispatch(receiveDoctors(res.data)))
    .catch(() => dispatch(errorDoctors()));
};

export const handleDoctorLogin = (dispatch) => {
  dispatch(doctorLogin());
  return fetch("/doctor_login")
    .then((res) => res.json())
    .then((res) => dispatch(doctorLogin(res.data)))
    .catch(() => dispatch(errorDoctorLogin()));
};

export const handleDoctorLogout = (dispatch) => {
  dispatch(doctorLogout());
  return fetch("/")
    .then((res) => res.json())
    .then((res) => dispatch(doctorLogout(res.data)))
    .catch(() => dispatch(errorDoctorLogin()));
};

export const handleClinicLogin = (dispatch) => {
  dispatch(clinicLogin());
  return fetch("/clinic_login")
    .then((res) => res.json())
    .then((res) => dispatch(clinicLogin(res.data)))
    .catch(() => dispatch(errorClinicLogin()));
};

export const handleClinicLogout = (dispatch) => {
  dispatch(clinicLogout());
  return fetch("/")
    .then((res) => res.json())
    .then((res) => dispatch(clinicLogout(res.data)))
    .catch(() => dispatch(errorClinicLogin()));
};
