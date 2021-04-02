import {
  loadingDoctors,
  receiveDoctors,
  errorDoctors,
  loadingClinics,
  receiveClinics,
  errorClinics,
} from "../../actions";

export const handleFetchDoctors = (dispatch) => {
  dispatch(loadingDoctors());
  return fetch("/doctors")
    .then((res) => res.json())
    .then((res) => dispatch(receiveDoctors(res.data)))
    .catch(() => dispatch(errorDoctors()));
};

export const handleFetchClinics = (dispatch) => {
  dispatch(loadingClinics());
  return fetch("/clinics")
    .then((res) => res.json())
    .then((res) => dispatch(receiveClinics(res.data)))
    .catch(() => dispatch(errorClinics()));
};
