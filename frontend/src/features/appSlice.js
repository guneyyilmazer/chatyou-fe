import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: "",
    username: "",
    profilePicture: "",
    isLoggedIn: "",
  },
  room: localStorage.getItem("room"),
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.user.isLoggedIn = action.payload;
    },
  },
});
export const { setUser, setRoom } = appSlice.actions;
export default appSlice.reducer;
