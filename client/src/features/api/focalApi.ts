import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const focalApi = createApi({
  reducerPath: "focalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "tasks",
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: `/tasks`,
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = focalApi;
