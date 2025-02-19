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
    updateUser: (state, action) => {
      state.users[action.payload.index] = action.payload.data;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = UserSlice.actions;
export default UserSlice.reducer;
