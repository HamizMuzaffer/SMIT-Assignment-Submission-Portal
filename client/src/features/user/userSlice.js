
// features/user/userSlice.js
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/auth';
import Cookies from 'js-cookie';
const initialState = {
  user: null,
  info: null,
  isAuthenticated: false,
  loading: false,
  error: null,
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
  // fetching Student
  export const fetchStudent = createAsyncThunk('student/fetchStudent', async (_, { rejectWithValue }) => {
    const token = Cookies.get('token');
    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      const response = await axiosInstance.get('/student/profile', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log(response.data)
      return response.data;
      
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
        builder
      .addCase(fetchStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
  });
  

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
