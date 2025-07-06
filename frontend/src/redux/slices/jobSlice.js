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

// 🔹 Fetch Recruiter Jobs
export const fetchRecruiterJobs = createAsyncThunk(
  "jobs/fetchRecruiterJobs",
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

      const { data } = await axios.get(`${API}/api/recruiter/view-jobs`, config);
      
      return data; // array of jobs

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `${API}/api/recruiter/delete-job/${jobId}`,
        config
      );


      return { jobId }; // return deleted jobId to update state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete job"
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
    // 🔹 Create Job
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
    })

    // 🔹 Fetch Recruiter Jobs
    .addCase(fetchRecruiterJobs.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchRecruiterJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
    })
    .addCase(fetchRecruiterJobs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload || "Failed to fetch jobs");
    })

     .addCase(deleteJob.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteJob.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = state.jobs.filter((job) => job._id !== action.payload.jobId);
      toast.success("Job deleted successfully");
    })
    .addCase(deleteJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });
}
});

export const { clearJobState } = jobSlice.actions;
export default jobSlice.reducer;
