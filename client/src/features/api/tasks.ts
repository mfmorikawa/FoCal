import { Task, TaskSliceState } from "../../vite-env";

export const initialState: TaskSliceState = {
    tasks: [
    {
      end: new Date("2022-12-10 12:00:00"),
      allDay: false,
      resource: {
        isComplete: true,
        projectID: "4eec8b8f-572e-4a49-90f8-c6706a1db6d8",
        taskID: "89d3eaca-4f98-4c67-9eaa-be94df8bcad9"
      },
      start: new Date("2022-12-10 10:00:00"),
      title: "Task 1"
    },
    {
      end: new Date("2022-12-11 12:00:00"),
      allDay: false,
      resource: {
        isComplete: false,
        projectID: "4eec8b8f-572e-4a49-90f8-c6706a1db6d8",
        taskID: "8b325996-c752-4048-9e9b-22bdd46e8037"
      },
      start: new Date("2022-12-11 10:00:00"),
      title: "Task 2"
    },
    {
      end: new Date("2022-12-12 12:00:00"),
      allDay: false,
      resource: {
        isComplete: false,
        projectID: "4eec8b8f-572e-4a49-90f8-c6706a1db6d8",
        taskID: "fedad225-ad34-49fa-99ec-fcfdcad92920"
      },
      start: new Date("2022-12-12 10:00:00"),
      title: "Task 3"
    }
  ],
  selected: undefined
}