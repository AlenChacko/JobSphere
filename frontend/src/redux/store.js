import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import recruiterReducer from "./slices/recruiterSlice";
import employeeReducer from './slices/employeeSlice'
import jobReducer from './slices/jobSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    recruiter: recruiterReducer,
    employee:employeeReducer,
     jobs: jobReducer,
  },
});

export default store;
