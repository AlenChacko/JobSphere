import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import recruiterReducer from "./slices/recruiterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
     recruiter: recruiterReducer,
   
  },
});

export default store;
