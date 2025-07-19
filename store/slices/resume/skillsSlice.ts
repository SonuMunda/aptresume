import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SkillItem {
  title: string;
  keywords: string;
}

interface SkillsState {
  data: SkillItem[];
  visible: boolean;
}

const initialState: SkillsState = {
  data: [],
  visible: true,
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addSkill: (state, action: PayloadAction<SkillItem>) => {
      state.data.push(action.payload);
    },
    updateSkill: (
      state,
      action: PayloadAction<{ index: number; skill: Partial<SkillItem> }>
    ) => {
      const { index, skill } = action.payload;
      state.data[index] = { ...state.data[index], ...skill };
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    resetSkills: () => initialState,
  },
});

export const { addSkill, updateSkill, removeSkill, toggleVisible, resetSkills } = skillsSlice.actions;

export default skillsSlice.reducer;
