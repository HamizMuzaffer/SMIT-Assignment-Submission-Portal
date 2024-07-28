import { configureStore } from '@reduxjs/toolkit';
import teacherReducer from '../features/teacher/teacherSlice'
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    teacher : teacherReducer
  },
});

export default store;