const initialState = { status: "loggedOut" };

export default function doctorLoginReducer(state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case "DOCTOR_LOGGED_IN": {
      return {
        ...state,
        status: "doctorLoggedIn",
      };
    }

    case "DOCTOR_LOGGED_OUT": {
      return {
        ...state,
        status: "doctorLoggedOut",
      };
    }

    case "CLINIC_LOGGED_IN": {
      return {
        ...state,
        status: "clinicLoggedIn",
      };
    }

    case "CLINIC_LOGGED_OUT": {
      return {
        ...state,
        status: "clinicLoggedOut",
      };
    }

    case "ERROR": {
      return {
        ...state,
        status: "error",
      };
    }

    default: {
      return state;
    }
  }
}
