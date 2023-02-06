import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import achievementServices from './../api/acheivementServices';
const initialState = [];

export const fetchAchievements = createAsyncThunk('fetchAchievements', async () => {
  const res = await achievementServices.fetchAchievements();
  return res.data;
});

export const fetchAchievement = createAsyncThunk('fetchAchievement', async id => {
  const res = await achievementServices.fetchAchievement(id);
  return res.data;
});

export const createAchievementUser = createAsyncThunk('createAchievementUser', async data => {
  const res = await achievementServices.createAchievementUser(data);
  return res.data;
});

const achievementSlice = createSlice({
  name: 'achievement',
  initialState,

  extraReducers: {
    [fetchAchievements.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [fetchAchievement.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [createAchievementUser.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

// export const {  } = achievementSlice.actions;
export default achievementSlice.reducer;
