import React from 'react'
import MiniDrawer from '../../components/Drawer';
import useAuthRedirect from '../../hooks/CheckAuth';
import { Typography,Container } from '@mui/material';
import '../../App.css'; // Import the CSS file

function TeacherCourse() {
    useAuthRedirect()

  return (
    <>
        <MiniDrawer />
        <div className="containerWithDrawer">
        <Container>
          <Typography variant='h3'>
            Course Outline
          </Typography>
        </Container>
      </div>

    </>
  )
}

export default TeacherCourse