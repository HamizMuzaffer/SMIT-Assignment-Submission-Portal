import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import TeacherLogin from '../pages/TeacherLogin';
import SignUp from '../pages/SignUp';

function Navigation() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
    },
    {
      path: '/login',
      element: <TeacherLogin />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Navigation;
