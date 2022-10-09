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
        title: "title",
        start: new Date(),
        end: new Date(),
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
      state = actions.payload;
    },
  },
});

export const { update } = tasksSlice.actions;
export default tasksSlice.reducer;
