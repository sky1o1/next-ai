import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: {
    id: number;
    name: string;
    username: string;
    email: string;
    gender: string;
    image: string;
  };
}

const initialState: UserState = {
  userData: {
    id: 0,
    name: "",
    username: "",
    email: "",
    gender: "",
    image: "",
  },
};

const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.userData = { ...action.payload.userData };
    },
  },
});

export const { setUser } = userDataSlice.actions;
export default userDataSlice.reducer;
