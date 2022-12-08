import { Project, Task } from "../../vite-env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const focalApi = createApi({
  reducerPath: "focalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://focalapi.onrender.com/api/users/test",
  }),
  tagTypes: ["Tasks", "Projects"],
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
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    createProjects: builder.mutation({
      query: (newProject: Project) => ({
        url: `/projects`,
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation({
      query: (projectID: string) => ({
        url: `/projects/${projectID}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: (updatedProject: Project) => ({
        url: `/projects/${updatedProject.projectID || ""}`,
        method: "PUT",
        body: updatedProject
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const { 
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
  useCreateProjectsMutation,
  useDeleteProjectMutation
} = focalApi;
