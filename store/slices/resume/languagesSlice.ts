import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageItem {
  title: string;
  level: number;
}

interface LanguagesState {
  data: LanguageItem[];
  visible: boolean;
}

const initialState: LanguagesState = {
  data: [],
  visible: true,
};

const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    addLanguage: (state, action: PayloadAction<LanguageItem>) => {
      state.data.push(action.payload);
    },
    updateLanguage: (
      state,
      action: PayloadAction<{ index: number; language: Partial<LanguageItem> }>
    ) => {
      const { index, language } = action.payload;
      state.data[index] = { ...state.data[index], ...language };
    },
    removeLanguage: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    resetLanguages: () => initialState,
  },
});

export const { addLanguage, updateLanguage, removeLanguage, toggleVisible, resetLanguages } = languagesSlice.actions;

export default languagesSlice.reducer;
