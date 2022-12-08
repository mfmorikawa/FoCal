import { Task } from "../../vite-env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const focalApi = createApi({
  reducerPath: "focalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://focalapi.onrender.com/api",
  }),
  tagTypes: ["Tasks", "Projects", "User"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation({
      query: (newTask: Task) => ({
        url: `/tasks`,
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (taskID: string) => ({
        url: `/tasks/${taskID}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: (updatedTask: Task) => ({
        url: `/tasks/${updatedTask.resource?.taskID || ""}`,
        method: "PUT",
        body: updatedTask
      }),
      invalidatesTags: ["Tasks"],
    }),
    loginUser: builder.mutation({
      query: ({username, password}) => ({
        url: `/users/${username}`,
        method: 'POST',
        body: password
      }),
      invalidatesTags: ["User"]
    })
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = focalApi;
