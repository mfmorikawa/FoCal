import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
// import projectsReducer from "../features/projects/projectsSlice";
import  usersReducer from '../features/user/userSlice';
import { focalApi } from "../features/api/focalApi";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    // projects: projectsReducer,
    users: usersReducer,
    [focalApi.reducerPath]: focalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(focalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
