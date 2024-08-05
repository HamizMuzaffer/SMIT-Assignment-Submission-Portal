import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    notes: [],
    status: 'idle',
    error: null,
};

export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (id) => {
        const response = await axios.get(`https://smit-server.vercel.app/notes/${id}`);
        return response.data;

    }
);

export const addNote = createAsyncThunk(
    'notes/addNotes',
    async (note, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://smit-server.vercel.app/notes', note);
            return response.data;
        } catch (error) {
            console.error('Error adding note:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateNote = createAsyncThunk(
    'notes/updateNotes',
    async ({ id, note }) => {
        const response = await axios.put(`https://smit-server.vercel.app/notes/${id}`, note);
        return response.data;
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNotes',
    async (id) => {
        await axios.delete(`https://smit-server.vercel.app/notes/${id}`);
        return id;
    }
);
const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (!Array.isArray(state.notes)) {
                    state.notes = [];
                }
                state.notes.push(action.payload);            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                if (!Array.isArray(state.notes)) {
                    state.notes = [];
                }
                state.notes.push(action.payload);
            })
            .addCase(addNote.rejected, (state, action) => {
                state.status = 'failed'
                state.error(action.payload);
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const index = state.notes.findIndex(note => note._id === action.payload._id);
                state.notes[index] = action.payload;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter(note => note._id !== action.payload);
            });
    },
});

export default notesSlice.reducer;
