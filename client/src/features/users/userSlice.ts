import { User } from "@auth0/auth0-react";
import { AuthState, initialAuthState } from "@auth0/auth0-react/dist/auth-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: AuthState = initialAuthState;

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        ...initialState,
        isAuthenticated: true
    },
    reducers: {},
});


export const useAuth = (state: RootState)=> state.users.isAuthenticated as boolean;
export default usersSlice.reducer;