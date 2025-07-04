import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Fetch logged-in recruiter's full profile
export const fetchRecruiterProfile = createAsyncThunk(
  "recruiter/fetchProfile",
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
        `${import.meta.env.VITE_BACKEND_URL}/api/recruiter/profile`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recruiter profile"
      );
    }
  }
);

// 🔹 Recruiter Slice
const recruiterSlice = createSlice({
  name: "recruiter",
  initialState: {
    recruiterInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearRecruiterState: (state) => {
      state.recruiterInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruiterProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecruiterProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.recruiterInfo = action.payload;
      })
      .addCase(fetchRecruiterProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRecruiterState } = recruiterSlice.actions;
export default recruiterSlice.reducer;
