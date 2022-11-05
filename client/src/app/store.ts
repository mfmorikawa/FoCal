import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from  '../features/tasks/tasksSlice';
// import  usersReducer from '../features/users/userSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        // projects: projectsReducer,
        // users: usersReducer
        // timers: timersReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
