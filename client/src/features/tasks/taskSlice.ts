import { Event } from "react-big-calendar";
import { createSlice } from "@reduxjs/toolkit";

export interface Task {
  ObjectID: string | undefined;
  projectID: string | undefined;
  isComplete: boolean;
  eventObject: Event;
}

const initialState: { tasks: Task[] } = {
  tasks: [
    {
      ObjectID: undefined,
      projectID: undefined,
      isComplete: false,
      eventObject: {
        title: "House of Dragons",
        start: new Date(2022,9,9,17,30),
        end: new Date(2022,9,9,19),
        allDay: false,
        resource: null,
      },
    },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    update: (state, actions) => {
      state.tasks.push(actions.payload);
    },
  },
});

export const { update } = tasksSlice.actions;
export default tasksSlice.reducer;
