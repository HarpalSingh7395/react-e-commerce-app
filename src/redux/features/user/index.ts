import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
}

interface UserState {
  currentUser: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    status: 'idle'
  } as UserState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
        state.currentUser = null;
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;