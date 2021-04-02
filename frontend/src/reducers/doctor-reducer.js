const initialState = { status: "idle", doctors: null };

export default function doctorReducer(state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case "LOADING_DOCTORS": {
      console.log(action);
      return {
        ...state,
        status: "loading",
      };
    }

    case "RECEIVE_DOCTORS": {
      console.log(action);
      return {
        ...state,
        doctors: action.doctors,
        status: "idle",
      };
    }

    case "ERROR": {
      console.log(action);
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
