import { configureStore } from '@reduxjs/toolkit';
import teacherReducer from '../features/teacher/teacherSlice'
import userReducer from '../features/user/userSlice';
import notesReducer from '../features/notes/notesSlice'
import announcementsReducer  from '../features/announcements/announcementsSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    teacher : teacherReducer,
    notes : notesReducer,
    announcements : announcementsReducer
  },
});

export default store;