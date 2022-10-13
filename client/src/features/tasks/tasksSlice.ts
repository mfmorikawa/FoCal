import { Event } from "react-big-calendar";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { startOfDay } from "date-fns";

export interface Task {
  ObjectID: string | undefined;
  projectID: string | undefined;
  eventObject: Event;
  isComplete: boolean;
};

interface TaskSliceState {
  tasks: Task[]
};

const initialState: TaskSliceState = {
  tasks: [
    {
      ObjectID: "ABCD1234",
      projectID: undefined,
      eventObject: {
        title: "House of Dragons",
        start: new Date(2022,9,9,18),
        end: new Date(2022,9,9,19),
        allDay: false,
        resource: null,
      },
      isComplete: false
    },
    {
      ObjectID: "BCDE2345",
      projectID: undefined,
      eventObject: {
        title: "Software Engineering",
        start: new Date(2022,9,13,15),
        end: new Date(2022,9,13,16,50),
        allDay: false,
        resource: null,
      },
      isComplete: false
    }
  ] 
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, actions: PayloadAction<Event>) => {
      const newTask: Task = {
        ObjectID: "CDEF3456",
        projectID: undefined,
        eventObject: actions.payload,
        isComplete: false
      }
      state.tasks.push(newTask);
    },
    updateTask: (state, actions: PayloadAction<{cur: Event, start: Date, end: Date}>) => {
      const events = state.tasks.map(task => task.eventObject);
      const curIdx = events.indexOf(actions.payload.cur);
      const oldTask = state.tasks.splice(curIdx,1)[0];
      const updatedEvent = {
        ...actions.payload.cur,
        start: actions.payload.start,
        end: actions.payload.end
      }
      state.tasks.push({...oldTask, eventObject: updatedEvent});
    },
    removeTask: (state, actions: PayloadAction<Event>) => {
      state.tasks = state.tasks.filter(({ eventObject }) => eventObject != actions.payload);
    }
  },
});


export const { createTask, updateTask, removeTask } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export default tasksSlice.reducer;
