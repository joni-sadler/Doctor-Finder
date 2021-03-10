import { combineReducers } from "redux";
import clinics from "./clinic-reducer";
import doctors from "./doctor-reducer";

export default combineReducers({ clinics, doctors });