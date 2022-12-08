import { Task, TaskResource, TaskSliceState } from "../../vite-env";  
import { RootState } from "../../app/store";
import { focalApi } from "../api/focalApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../api/tasks";

export const tasksSlice = createSlice({
// focalApi.injectEndpoints({
  // endpoints: (builder) => ({
  //   getTasks: builder.query<Task[], void>({
  //     query: () => "/tasks",
  //     providesTags: ["Tasks"],
  //   }),
  //   getTask: builder.query<Task, void>({
  //     query: (taskID) => `/tasks/${taskID}`
  //   }),
  //   createTask: builder.mutation({
  //     query: (newTask: Task) => ({
  //       url: `/tasks`,
  //       method: "POST",
  //       body: {
  //         ...newTask,
  //         start: newTask.start?.toISOString(),
  //         end: newTask.end?.toISOString()
  //       },
  //     }),
  //     invalidatesTags: ["Tasks"],
  //   }),
  //   deleteTask: builder.mutation({
  //     query: (taskID: string) => ({
  //       url: `/tasks/${taskID}`,
  //       method: "DELETE"
  //     }),
  //     invalidatesTags: ["Tasks"],
  //   }),
  //   updateTask: builder.mutation({
  //     query: (updatedTask: Task) => ({
  //       url: `/tasks/${updatedTask.resource?.taskID || ""}`,
  //       method: "PUT",
  //       body: {
  //         ...updatedTask,

  //       }
  //     }),
  //     invalidatesTags: ["Tasks"],
  //   }),
  // })
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, actions: PayloadAction<Task>) => {
      const newTask: Task = actions.payload;
      console.log("fires");
      state.tasks.push(newTask);
    },
    updateTask: (
      state,
      actions: PayloadAction<{ cur: Task; start: Date; end: Date }>
    ) => {
      const { cur, start, end } = actions.payload;
      const index = state.tasks.findIndex(
        (task: Task) =>
          task.resource &&
          cur.resource &&
          task.resource.taskID == cur.resource.taskID
      );
      const updatedEvent = {
        ...cur,
        start: start,
        end: end,
      };
      // remove original copy and push updated version
      state.tasks.splice(index, 1)[0];
      state.tasks.push(updatedEvent);
    },
    removeTask: (state, actions: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter(
        ({ resource }) =>
          resource &&
          actions.payload.resource &&
          resource.taskID != actions.payload.resource.taskID
      );
    },
    setSelected: (state, actions: PayloadAction<Task>) => {
      state.selected = actions.payload;
      console.log(actions.payload);
    },
  },
});

export const { createTask, updateTask, removeTask, setSelected } =
  tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectedTask = (state: RootState) => state.tasks.selected;
export default tasksSlice.reducer;

