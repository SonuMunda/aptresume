import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HobbyItem {
  title: string;
}

interface HobbiesState {
  data: HobbyItem[];
  visible: boolean;
}

const initialState: HobbiesState = {
  data: [],
  visible: true,
};

const hobbiesSlice = createSlice({
  name: "hobbies",
  initialState,
  reducers: {
    addHobby: (state, action: PayloadAction<HobbyItem>) => {
      state.data.push(action.payload);
    },
    updateHobby: (
      state,
      action: PayloadAction<{ index: number; hobby: Partial<HobbyItem> }>
    ) => {
      const { index, hobby } = action.payload;
      state.data[index] = { ...state.data[index], ...hobby };
    },
    removeHobby: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    resetHobbies: () => initialState,
  },
});

export const { addHobby, updateHobby, removeHobby, toggleVisible, resetHobbies } = hobbiesSlice.actions;

export default hobbiesSlice.reducer;
