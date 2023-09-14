import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: "",
    username: "",
    profilePicture: "",
    isLoggedIn: "",
  },
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
        console.log(action.payload)
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.user.isLoggedIn = action.payload;
    },
  },
});
export const {setUser} = appSlice.actions;
export default appSlice.reducer;
