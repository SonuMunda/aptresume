import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExperienceItem {
  company: string;
  position: string;
  location: string;
  date: string;
  description: string;
}

interface ExperienceState {
  data: ExperienceItem[];
  visible: boolean;
}

const initialState: ExperienceState = {
  data: [],
  visible: true,
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    addExperience: (state, action: PayloadAction<ExperienceItem>) => {
      state.data.push(action.payload);
    },
    updateExperience: (
      state,
      action: PayloadAction<{
        index: number;
        experience: Partial<ExperienceItem>;
      }>
    ) => {
      const { index, experience } = action.payload;
      state.data[index] = { ...state.data[index], ...experience };
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    resetExperience: () => initialState,
  },
});

export const {
  addExperience,
  updateExperience,
  removeExperience,
  toggleVisible,
  resetExperience,
} = experienceSlice.actions;

export default experienceSlice.reducer;
