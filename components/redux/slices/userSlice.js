import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userServices from './../api/userServices';
const initialState = [];



export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  const res = await userServices.fetchUsers();
  return res.data;
});

export const fetchUser = createAsyncThunk('fetchUser', async (id) => {
  const res = await userServices.fetchUser(id);
  return res.data;
});


const userSlice = createSlice({
  name: 'user',
  initialState,
  
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [fetchUser.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

// export const {  } = userSlice.actions;
export default userSlice.reducer;