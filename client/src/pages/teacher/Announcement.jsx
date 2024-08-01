import React from 'react'
import useAuthRedirect from '../../hooks/CheckAuth'
import { Container, Typography } from '@mui/material'
import MiniDrawer from '../../components/Drawer';
import '../../App.css'; 

function TeacherAnnouncement() {
  useAuthRedirect
  return (
    <>
       <MiniDrawer />
      <div className="containerWithDrawer">
        <Container>
          <Typography variant='h3'>
            All the major announcements will be posted here
          </Typography>
        </Container>
      </div>

    </>
  )
}

export default TeacherAnnouncement