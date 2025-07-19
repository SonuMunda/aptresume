import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  network: string;
  username: string;
  url: string;
}

interface ProfilesState {
  data: Profile[];
  visible: boolean;
}

const initialState: ProfilesState = {
  data: [],
  visible: true,
};

const profilesSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<Profile>) => {
      state.data.push(action.payload);
    },

    updateProfile: (
      state,
      action: PayloadAction<{
        index: number;
        profile: Partial<Profile>;
      }>
    ) => {
      const { index, profile } = action.payload;
      state.data[index] = { ...state.data[index], ...profile };
    },

    removeProfile: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },

    toggleVisible: (state) => {
      state.visible = !state.visible;
    },

    resetProfiles: () => initialState,
  },
});

export const {
  addProfile,
  updateProfile,
  removeProfile,
  toggleVisible,
  resetProfiles,
} = profilesSlice.actions;

export default profilesSlice.reducer;
