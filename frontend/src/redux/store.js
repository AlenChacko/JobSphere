import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import recruiterReducer from "./slices/recruiterSlice";
import employeeReducer from './slices/employeeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    recruiter: recruiterReducer,
    employee:employeeReducer,
  },
});

export default store;
