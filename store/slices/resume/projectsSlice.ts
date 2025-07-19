import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectItem {
  title: string;
  duration: string;
  link: string;
  keywords: string;
  description: string;
}

interface ProjectsState {
  data: ProjectItem[];
  visible: boolean;
}

const initialState: ProjectsState = {
  data: [],
  visible: true,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectItem>) => {
      state.data.push(action.payload);
    },
    updateProject: (
      state,
      action: PayloadAction<{
        index: number;
        project: Partial<ProjectItem>;
      }>
    ) => {
      const { index, project } = action.payload;
      state.data[index] = { ...state.data[index], ...project };
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    resetProjects: () => initialState,
  },
});

export const { addProject, updateProject, removeProject, toggleVisible, resetProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
