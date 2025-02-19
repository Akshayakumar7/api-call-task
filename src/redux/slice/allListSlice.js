import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      console.log("state", action);
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = UserSlice.actions;
export default UserSlice.reducer;
