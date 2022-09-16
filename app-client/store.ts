import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        tasks: tasksReducer,
        users: usersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
