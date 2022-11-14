import { Task, TaskResource } from "../../vite-env";
import TasksListk from "../tasks/TaskList";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Project = {
  name: string;
  taskList: Task[];
};

export type ProjectSliceState = {
  projects: Project[];
};

const initialState: ProjectSliceState = {
  projects: [],
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    createProject: (state, actions: PayloadAction<Project>) => {
      const newProject: Project = actions.payload;
      console.log("fires");
      state.projects.push(newProject);
    },
  },
});

export const { createProject } = projectsSlice.actions;
export const selectProjects = (state: RootState) => state.tasks.tasks;
export default projectsSlice.reducer;
