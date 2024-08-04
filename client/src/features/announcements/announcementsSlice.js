import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  announcements: [],
  status: 'idle',
  error: null,
};

export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAnnouncements',
  async (id) => {
    const response = await axios.get(`http://localhost:3000/teacher/announcements/${id}`);
    return response.data;
  }
);

export const fetchAllAnnouncements = createAsyncThunk(
  'announcements/fetchAllAnnouncements',
  async () => {
    const response = await axios.get(`http://localhost:3000/teacher/announcements`);
    return response.data;
  }
);

export const addAnnouncement = createAsyncThunk(
  'announcements/addAnnouncement',
  async (announcement) => {
    const response = await axios.post('http://localhost:3000/teacher/announcements', announcement);
    return response.data;
  }
);

export const updateAnnouncement = createAsyncThunk(
  'announcements/updateAnnouncement',
  async ({ id, announcement }) => {
    const response = await axios.put(`http://localhost:3000/teacher/announcements/${id}`, announcement);
    return response.data;
  }
);

export const deleteAnnouncement = createAsyncThunk(
  'announcements/deleteAnnouncement',
  async (id) => {
    await axios.delete(`http://localhost:3000/teacher/announcements/${id}`);
    return id;
  }
);

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (!Array.isArray(state.announcements)) {
          state.announcements = [];
      }
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllAnnouncements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (!Array.isArray(state.announcements)) {
          state.announcements = [];
      }
        state.announcements = action.payload;
      })
      .addCase(addAnnouncement.fulfilled, (state, action) => {
        if (!Array.isArray(state.announcements)) {
          state.announcements = [];
      }
      state.announcements.push(action.payload);

      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        const index = state.announcements.findIndex(announcement => announcement._id === action.payload._id);
        state.announcements[index] = action.payload;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.announcements = state.announcements.filter(announcement => announcement._id !== action.payload);
      });
  },
});

export default announcementsSlice.reducer;
