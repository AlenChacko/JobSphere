import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_BACKEND_URL;

// 🔹 Update Recruiter Profile
export const updateRecruiterProfile = createAsyncThunk(
  "recruiter/updateProfile",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API}/api/recruiter/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Profile updated successfully");
      return data.recruiter;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔹 Fetch Recruiter by ID
export const fetchRecruiterById = createAsyncThunk(
  "recruiter/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/recruiter/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.recruiter;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch recruiter");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState: {
    profile: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔸 Update profile
      .addCase(updateRecruiterProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecruiterProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateRecruiterProfile.rejected, (state) => {
        state.loading = false;
      })

      // 🔸 Fetch by ID
      .addCase(fetchRecruiterById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecruiterById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchRecruiterById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default recruiterSlice.reducer;
