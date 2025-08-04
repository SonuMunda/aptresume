import { Job } from "@/types/jobs";
import { createSlice } from "@reduxjs/toolkit";

interface JobsState {
  data: Job[];
  loading: boolean;
  error: string| null;
}

const initialState: JobsState = {
  data: [],
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setJobs, setLoading, setError } = jobsSlice.actions;
export default jobsSlice.reducer;
