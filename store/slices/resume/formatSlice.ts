import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormatData {
  template: string;
  font: string;
  fontSize: number;
  lineHeight: number;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  pageSize: string;
  pageMargin: number;
}

interface FormatState {
  data: FormatData;
}

const initialState: FormatState = {
  data: {
    template: "template01",
    font: "Arial",
    fontSize: 14,
    lineHeight: 1.6,
    primaryColor: "#1976d2",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    pageSize: "A4",
    pageMargin: 20,
  },
};

const formatSlice = createSlice({
  name: "format",
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<string>) => {
      state.data.template = action.payload;
    },
    setFont: (state, action: PayloadAction<string>) => {
      state.data.font = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.data.fontSize = action.payload;
    },
    setLineHeight: (state, action: PayloadAction<number>) => {
      state.data.lineHeight = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.data.primaryColor = action.payload;
    },
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.data.backgroundColor = action.payload;
    },
    setTextColor: (state, action: PayloadAction<string>) => {
      state.data.textColor = action.payload;
    },
    setPageSize: (state, action: PayloadAction<string>) => {
      state.data.pageSize = action.payload;
    },
    setPageMargin: (state, action: PayloadAction<number>) => {
      state.data.pageMargin = action.payload;
    },
    resetFormat: () => initialState,
  },
});

export const {
  setTemplate,
  setFont,
  setFontSize,
  setLineHeight,
  setPrimaryColor,
  setBackgroundColor,
  setTextColor,
  setPageSize,
  setPageMargin,
  resetFormat,
} = formatSlice.actions;

export default formatSlice.reducer;
