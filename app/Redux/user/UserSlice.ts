import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

interface IinitialState {
  user: {
    auth: boolean;
    email?: string;
    jwt?: string;
    avatar: string | null;
  };
}

const initialState: IinitialState = {
  user: { auth: false, avatar: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser(state, action: PayloadAction<string>) {
      const parsedJWT = jwtDecode<{ email: string }>(action.payload);
      if (parsedJWT.email) {
        state.user.auth = true;
        state.user.email = parsedJWT.email;
        state.user.jwt = action.payload;
      }
    },
    setAvatar(state, action: PayloadAction<string | null>) {
      state.user.avatar = action.payload;
    },
  },
});

export const { authUser, setAvatar } = userSlice.actions;

export default userSlice.reducer;
