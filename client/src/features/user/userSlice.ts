import { User } from "../../vite-env";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: User = {
  username: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, actions: PayloadAction<User>) => {
      const {username, password} = actions.payload;
      if (username == 'user1' && password && password == 'password123') {  
        state.username = username;
        state.isLoggedIn = true;
      }
    },
    logoutUser: (state) => {
        if (state.isLoggedIn) {
          state.username = '';
          state.isLoggedIn = false;
        }
      }
    },
  },
);

export const { loginUser, logoutUser } =
  userSlice.actions;
export const selectUser = (state: RootState) => state.users;
export default userSlice.reducer;