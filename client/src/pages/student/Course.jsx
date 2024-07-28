import React from 'react'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import useAuthRedirect from '../../hooks/CheckAuth';
import { Typography,Container } from '@mui/material';
import '../../App.css'; // Import the CSS file

function Course() {
    useAuthRedirect()

  return (
    <>
      <PersistentDrawerLeft />
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

export default Course