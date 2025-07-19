import { configureStore } from "@reduxjs/toolkit";
import basicsSlice from "./slices/resume/basicsSlice";
import profilesSlice from "./slices/resume/profilesSlice";
import summarySlice from "./slices/resume/summarySlice";
import educationSlice from "./slices/resume/educationSlice";
import experienceSlice from "./slices/resume/experienceSlice";
import ProjectsSlice from "./slices/resume/projectsSlice";
import achievementsSlice from "./slices/resume/achievementsSlice";
import certificationsSlice from "./slices/resume/certificationsSlice";
import skillsSlice from "./slices/resume/skillsSlice";
import languagesSlice from "./slices/resume/languagesSlice";
import hobbiesSlice from "./slices/resume/hobbiesSlice";
import formatSlice from "./slices/resume/formatSlice";

const store = configureStore({
  reducer: {
    basics: basicsSlice,
    profiles: profilesSlice,
    summary: summarySlice,
    education: educationSlice,
    experience: experienceSlice,
    projects: ProjectsSlice,
    achievements: achievementsSlice,
    certifications: certificationsSlice,
    skills: skillsSlice,
    languages: languagesSlice,
    hobbies: hobbiesSlice,
    format: formatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
