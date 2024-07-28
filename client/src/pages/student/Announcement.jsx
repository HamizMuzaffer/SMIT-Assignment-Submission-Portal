import React from 'react'
import useAuthRedirect from '../../hooks/CheckAuth'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import { Container, Typography } from '@mui/material'
import '../../App.css'; 

function Announcement() {
  useAuthRedirect
  return (
    <>
          <PersistentDrawerLeft />
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

export default Announcement