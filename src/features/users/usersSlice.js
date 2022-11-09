import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const POST_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(POST_URL);
  return [...response.data];
});

// [
//   { id: 0, name: 'Dave Lebowski' },
//   { id: 1, name: 'Neil Young' },
//   { id: 2, name: 'Dave Gray' },
//   { id: 3, name: 'Jeirsen Lopera' },
// ];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);

export default userSlice.reducer;
