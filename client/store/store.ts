import { configureStore } from '@reduxjs/toolkit';

const tasksReducer = (prev, state) => {
    return state;
}

export const store = configureStore({
    reducer: {
        tasks: tasksReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
