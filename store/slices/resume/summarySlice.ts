import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SummaryState {
  data: string;
  visible: boolean;
}

const initialState: SummaryState = {
  data: "",
  visible: true,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    setSummary: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },

    resetSummary: () => initialState,
  },
});

export const { setSummary, toggleVisible, resetSummary } = summarySlice.actions;
export default summarySlice.reducer;
