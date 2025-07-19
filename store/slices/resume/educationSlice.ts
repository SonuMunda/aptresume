import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EducationItem {
  institute: string;
  type: string;
  area: string;
  score: string;
  date: string;
}

interface EducationState {
  data: EducationItem[];
  visible: boolean;
}

const initialState: EducationState = {
  data: [],
  visible: true,
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    addEducation: (state, action: PayloadAction<EducationItem>) => {
      state.data.push(action.payload);
    },
    updateEducation: (
      state,
      action: PayloadAction<{
        index: number;
        education: Partial<EducationItem>;
      }>
    ) => {
      const { index, education } = action.payload;
      state.data[index] = { ...state.data[index], ...education };
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    resetEducation: () => initialState,
  },
});

export const {
  addEducation,
  updateEducation,
  removeEducation,
  toggleVisible,
  resetEducation,
} = educationSlice.actions;

export default educationSlice.reducer;
