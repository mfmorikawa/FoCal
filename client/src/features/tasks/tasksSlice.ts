import { Task, TaskResource, TaskSliceState } from "../../vite-env";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: TaskSliceState = {
  tasks: [
    {
      title: "House of Dragons",
      start: new Date(2022, 9, 29, 18),
      end: new Date(2022, 9, 29, 19),
      allDay: false,
      resource: {
        ObjectID: nanoid(),
        projectID: "0000",
        isComplete: false,
      },
    },
    {
      title: "Software Engineering",
      start: new Date(2022, 9, 31, 15),
      end: new Date(2022, 9, 31, 16, 50),
      allDay: false,
      resource: {
        ObjectID: nanoid(),
        projectID: "0000",
        isComplete: false,
      },
    },
  ]
};

export const tasksSlice = createSlice({
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
        (task: Task) => task.resource && cur.resource && task.resource.ObjectID == cur.resource.ObjectID
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
        ({ resource }) => resource && actions.payload.resource && resource.ObjectID != actions.payload.resource.ObjectID
      );
    },
    setSelected: (state, actions: PayloadAction<Task>) => {
      state.selected = actions.payload;
      console.log(actions.payload);
    }  
  },
});

export const { createTask, updateTask, removeTask, setSelected } =
  tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectedTask = (state: RootState) => state.tasks.selected;
export default tasksSlice.reducer;
