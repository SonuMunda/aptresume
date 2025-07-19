import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasicsState {
  fullname: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  image?: string;
  visible: boolean;
}

const initialState: BasicsState = {
  fullname: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  portfolio: "",
  image: "",
  visible: true,
};

const basicsSlice = createSlice({
  name: "basics",
  initialState,
  reducers: {
    setBasics: (state, action: PayloadAction<BasicsState>) => {
      return { ...state, ...action.payload };
    },
    updateField: (
      state,
      action: PayloadAction<{ field: keyof BasicsState; value: string | boolean }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value as never;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    resetBasics: () => initialState,
  },
});

export const { setBasics, updateField, setImage, toggleVisible, resetBasics } = basicsSlice.actions;

export default basicsSlice.reducer;
