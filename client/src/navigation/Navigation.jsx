import React from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import TeacherLogin from '../pages/TeacherLogin';
import Student from '../pages/student/Student';
import Cookies from 'js-cookie';
import Notes from '../pages/student/Notes';
import Assignments from '../pages/student/Assignments';
import LoginForm from '../pages/student/LoginForm';
import SignUp from '../pages/student/Signup';
import Discussion from '../pages/student/Discussion';
import Course from '../pages/student/Course';
function Navigation() {
  const token = Cookies.get("token")

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
    },
    {
      path: '/teacher/login',
      element: <TeacherLogin />,
    },
    {
      path: '/student/signup',
      element :  <SignUp />
    },
    {
      path: '/student/login',
      element : <LoginForm />
    },
    {
      path: '/student/home',
      element: <Student />,
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default Navigation;
