const initialState = {status: 'idle'};

export default function doctorReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING_DOCTORS": {
     console.log(action);
      return {
        ...state,
        status: "loading",
      }
    }

    case "RECEIVE_DOCTORS": {
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
