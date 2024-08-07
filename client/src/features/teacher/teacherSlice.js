import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/auth';
import Cookies from 'js-cookie';
const initialState = {
  user: null,
  isAuthenticated: false,
  
};
  
  // Login action
  export const loginUser = createAsyncThunk('teacher/login', async (teacherData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/teacher/login', teacherData, {
        withCredentials: true
      });
      console.log('Full response:', response);
      console.log('Response headers:', response.headers);
      const { teacher, token } = response.data;
      console.log('Received token:', token);
      return teacher;
    } catch (err) {
      console.error('Login error:', err);
      console.log('Error response:', err.response);
      return rejectWithValue(err.response?.data || 'An error occurred');
    }
  });
  
  export const fetchUser = createAsyncThunk('teacher/fetchUser', async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/teacher/profile', {
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      console.error('Fetch user error:', err);
      return rejectWithValue(err.response?.data || 'An error occurred');
    }
  });


  const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
      logout(state) {
        state.info = null;
        state.isAuthenticated = false;
        Cookies.remove('token');
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
  });
  

export const { login, logout } = teacherSlice.actions;

export default teacherSlice.reducer;
