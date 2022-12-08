import { nanoid } from "@reduxjs/toolkit";
import { ImportantDate, Project } from "../../vite-env";

export const projects: Project[] = [
    {
      importantDates: new Array<ImportantDate>(),
      name: "No Project",
      username: "user1",
      projectID: "4eec8b8f-572e-4a49-90f8-c6706a1db6d8",
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
        ],
        progress: 50
      }
      ,
        {
          projectID: nanoid(8),
          name: "No Projects",
          username: "user1",
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
          importantDates: new Array<ImportantDate>(),
          deadline: "none",
          progress: 0,
        },
        {
          projectID: nanoid(8),
          name: "School Projects",
          username: "user1",
          tasks: [
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
          importantDates: new Array<ImportantDate>(),
          deadline: "Dec 16 2022",
          progress: 50,
        },
    {
      username: "user1",
      importantDates: [
        {
          date: "2022-12-25 00:00:00",
          name: "Test Date"
        },
        {
          date: "2022-12-31 00:00:00",
          name: "Test Date"
        }
      ],
      name: "New Project",
      projectID: "e7ce3583-e687-484c-aa8c-9afbdf6339b7",
      tasks: [],
      progress: 0,
    }
  ]


