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
      const response = await axiosInstance.post('/teacher/login', teacherData);
      const { teacher, token } = response.data;
      Cookies.set('token', token);
      console.log({teacher : teacher});
      return teacher;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });
  
  const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
      logout(state) {
        state.teacher = null;
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
          state.teacher = action.payload;
          state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  

export const { login, logout } = teacherSlice.actions;

export default teacherSlice.reducer;
