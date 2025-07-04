import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import recruiterReducer from "./slices/recruiterSlice"; // ✅ import recruiter slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    recruiter: recruiterReducer, // ✅ register recruiter reducer
  },
});

export default store;
