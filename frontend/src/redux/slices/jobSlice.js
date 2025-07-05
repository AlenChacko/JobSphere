import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_BACKEND_URL;

// 🔹 Create Job
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`${API}/api/recruiter/create-job`, jobData, config);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Job creation failed"
      );
    }
  }
);

// 🔹 Job Slice
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    job: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearJobState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to create job");
      });
  },
});

export const { clearJobState } = jobSlice.actions;
export default jobSlice.reducer;
