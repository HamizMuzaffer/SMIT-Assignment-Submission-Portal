
// features/user/userSlice.js
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/auth';
import Cookies from 'js-cookie';
const initialState = {
  user: null,
  isAuthenticated: false,
};
export const signupUser = createAsyncThunk('student/signup', async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/student/signup', userData);
      return response.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'An error occurred');
    }
  });
  
  // Login action
  export const loginUser = createAsyncThunk('student/login', async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/student/login', userData);
      const { student, token } = response.data;
      Cookies.set('token', token);
      return student;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });
  


  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logout(state) {
        state.user = null;
        state.isAuthenticated = false;
        Cookies.remove('token');
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(signupUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
        })
        .addCase(signupUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
