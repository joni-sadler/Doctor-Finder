import { loadingDoctors, receiveDoctors, errorDoctors } from "../../actions";

// Receive entire list of doctors to populate search bar in header
export const handleFetchDoctors = (dispatch) => {
  dispatch(loadingDoctors());
  return fetch("/doctors")
    .then((res) => res.json())
    .then((res) => dispatch(receiveDoctors(res.data)))
    .catch(() => dispatch(errorDoctors()));
};
