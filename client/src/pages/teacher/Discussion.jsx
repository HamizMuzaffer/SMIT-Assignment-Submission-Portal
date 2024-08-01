import React from 'react'
import MiniDrawer from '../../components/Drawer';
import useAuthRedirect from '../../hooks/CheckAuth';
import { Typography,Container } from '@mui/material';
import '../../App.css'; // Import the CSS file
function TeacherDiscussion() {
    useAuthRedirect()
    return (
        <>
        <MiniDrawer />
      <div className="containerWithDrawer">
        <Container>
          <Typography variant='h3'>
            Discussion
          </Typography>
        </Container>
      </div>

        </>
    )
}

export default TeacherDiscussion