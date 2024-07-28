import React from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import TeacherLogin from '../pages/teacher/TeacherLogin';
import Student from '../pages/student/Student';
import Cookies from 'js-cookie';
import Notes from '../pages/student/Notes';
import Assignments from '../pages/student/Assignments';
import LoginForm from '../pages/student/LoginForm';
import SignUp from '../pages/student/Signup';
import Discussion from '../pages/student/Discussion';
import Course from '../pages/student/Course';
import Announcement from '../pages/student/Announcement';
import Teacher from '../pages/teacher/Teacher';
function Navigation() {
  const token = Cookies.get("token")

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
    },
    {
      path: '/teacher/login',
      element:  <TeacherLogin />,
    },
    {
      path: '/teacher/home',
      element: <Teacher /> 
    },
    {
      path: '/student/signup',
      element : token ? <Student /> : <SignUp />
    },
    {
      path: '/student/login',
      element : token ? <Student /> :  <LoginForm />
    },
    {
      path: '/student/home',
      element: <Student />,
    },
    
    {
      path: '/student/assignments',
      element: <Assignments />,
    },
    
    {
      path: '/student/discussion',
      element: <Discussion />,
    },
    
    {
      path: '/student/notes',
      element: <Notes />,
    },
    
    {
      path: '/student/course',
      element: <Course />,
    },
    {
      path: '/student/announcements',
      element: <Announcement />,
    },
    
    
  ]);

  return <RouterProvider router={router} />;
}

export default Navigation;
