import { Event } from "react-big-calendar";
import { createSlice } from "@reduxjs/toolkit";

export interface Task {
  ObjectID: string | undefined;
  projectID: string | undefined;
  index: number;
  eventObject: Event;
}

const initialState = {
    tasks: [
        {
            ObjectID: undefined,
            projectID: undefined,
            index: -1,
            eventObject: {
            title: "title",
            start: new Date(),
            end: new Date(),
            allDay: false,
            resource: null,
            }
        },
        {
            ObjectID: undefined,
            projectID: undefined,
            index: -1,
            eventObject: {
            title: "title",
            start: new Date(),
            end: new Date(),
            allDay: false,
            resource: null,
            }
        }
    ]
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        create: (state) => {
            state.tasks.push({
                ObjectID: undefined,
                projectID: undefined,
                index: -1,
                eventObject: {
                    title: "title",
                    start: new Date(),
                    end: new Date(),
                    allDay: false,
                    resource: null,
                }
            });
        }
    }
});

export const { create } = tasksSlice.actions;
export default tasksSlice.reducer;