import React from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Cookies from 'js-cookie';
import { TeacherAnnouncement,TeacherAssignments,TeacherCourse,TeacherDiscussion,Leaderboard,TeacherLogin,TeacherNotes,Teacher, AssignmentDetails } from '../pages/teacher/index';
import {Announcement,Discussion,Notes,Assignments,Course,LoginForm,SignUp,Student} from '../pages/student/index'
import Submission from '../pages/student/Submission';

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
      element : token ? <Student /> :  <SignUp />
    },
    {
      path: '/student/login',
      element : <LoginForm />
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

    {
      path : "/teacher/assignments",
      element : <TeacherAssignments />,
    },
    {
      path :  "/teacher/announcements",
      element : <TeacherAnnouncement />
    },
    {
      path :  "/teacher/notes",
      element : <TeacherNotes />
    },
    {
      path : "/teacher/course",
      element : <TeacherCourse />
    },
    {
      path: "/teacher/leaderboard",
      element : <Leaderboard />
    },
    {
      path : '/teacher/discussion',
      element : <TeacherDiscussion />
    },
    {
      path : '/teacher/assignments/:id',
      element : <AssignmentDetails />
    },
    {
      path : '/student/assignments/:id',
      element : <Submission />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default Navigation;
