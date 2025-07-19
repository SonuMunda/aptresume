import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  link: string;
  description: string;
}

interface CertificationsState {
  data: CertificationItem[];
  visible: boolean;
}

const initialState: CertificationsState = {
  data: [],
  visible: true,
};

const certificationsSlice = createSlice({
  name: "certifications",
  initialState,
  reducers: {
    addCertification: (state, action: PayloadAction<CertificationItem>) => {
      state.data.push(action.payload);
    },
    updateCertification: (
      state,
      action: PayloadAction<{ index: number; certification: Partial<CertificationItem> }>
    ) => {
      const { index, certification } = action.payload;
      state.data[index] = { ...state.data[index], ...certification };
    },
    removeCertification: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    resetCertifications: () => initialState,
  },
});

export const { addCertification, updateCertification, removeCertification, toggleVisible, resetCertifications } = certificationsSlice.actions;

export default certificationsSlice.reducer;
