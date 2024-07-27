import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import TeacherLogin from '../pages/TeacherLogin';
import Student from '../pages/student/Student';
import SignUp from '../pages/student/Signup';
import LoginForm from '../pages/student/LoginForm';
function Navigation() {
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
      element: <SignUp />,
    },
    {
      path: '/student/login',
      element: <LoginForm />,
    },
    {
      path : '/student/home',
      element : <Student />
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Navigation;
