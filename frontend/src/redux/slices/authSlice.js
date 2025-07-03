import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_BACKEND_URL;

// 🔹 Register Employee
export const registerEmployee = createAsyncThunk(
  "auth/registerEmployee",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/api/auth/register-employee`, formData);
      toast.success(data.message);
      return {
        user: {
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
        token: data.token,
        role: "employee",
      };
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


// 🔹 Login Employee
export const loginEmployee = createAsyncThunk(
  "auth/loginEmployee",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/api/auth/login-employee`, formData);
      toast.success(data.message);
      return {
        user: {
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
        token: data.token,
        role: "employee",
      };
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


// 🔹 Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.clear();
      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(registerEmployee.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(loginEmployee.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
