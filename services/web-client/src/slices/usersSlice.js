import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../const/routes';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async (values) => {
  const result = await axios.post(routes.getUsersPath(), values);
  console.log('!!!!result.data', result.data)
  return result.data;
});

const initialState = { isInitialState: true, loadingStatus: 'idle', error: null, users: [] };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users.push(action.payload);
    },
    removeAllUsers: (state) => {
      state.users = [];
    },
    changeInitialState: (state) => {
      state.isInitialState = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = [...state.users, ...action.payload];
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
