import { combineReducers } from "redux";
import clinics from "./clinic-reducer";
import doctors from "./doctor-reducer";
import status from "./login-reducers";

export default combineReducers({ clinics, doctors, status });
