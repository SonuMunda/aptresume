import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AchievementItem {
  title: string;
  awarder: string;
  date: string;
  position: string;
  description: string;
}

interface AchievementsState {
  data: AchievementItem[];
  visible: boolean;
}

const initialState: AchievementsState = {
  data: [],
  visible: true,
};

const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {
    addAchievement: (state, action: PayloadAction<AchievementItem>) => {
      state.data.push(action.payload);
    },
    updateAchievement: (
      state,
      action: PayloadAction<{ index: number; achievement: Partial<AchievementItem> }>
    ) => {
      const { index, achievement } = action.payload;
      state.data[index] = { ...state.data[index], ...achievement };
    },
    removeAchievement: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    resetAchievements: () => initialState,
  },
});

export const { addAchievement, updateAchievement, removeAchievement, toggleVisible, resetAchievements } = achievementsSlice.actions;

export default achievementsSlice.reducer;
