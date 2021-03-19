const initialState = { 
  status: "idle",
};

export default function clinicReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING_CLINICS": {
     console.log(action);
      return {
        ...state,
        status: "loading",
      }
    }

    case "RECEIVE_CLINICS": {
      console.log(action);
        return {
          ...state,
          status: "idle",
        }
    }

    case "ERROR": {
      console.log(action);
      return {
        ...state,
        status: "error",
      }
    }

    default: {
      return state;
    }
  }
}
