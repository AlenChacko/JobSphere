import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Fetch logged-in employee's full profile
export const fetchEmployeeProfile = createAsyncThunk(
  "employee/fetchProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/profile`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Employee profile"
      );
    }
  }
);
// 🔄 Update employee profile
export const updateEmployeeProfile = createAsyncThunk(
  "employee/updateProfile",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Needed for FormData
        },
      };

      const { data } = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/update-profile`,
        formData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// 🔹 employee Slice
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employeeInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearEmployeeState: (state) => {
      state.employeeInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeInfo = action.payload;
      })
      .addCase(fetchEmployeeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateEmployeeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeInfo = action.payload; // Update local state with updated profile
      })
      .addCase(updateEmployeeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmployeeState } = employeeSlice.actions;
export default employeeSlice.reducer;
