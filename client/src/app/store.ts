import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from  '../features/tasks/tasksSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        // projects: projectsReducer,
        // users: usersReducer,
        // timers: timersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
