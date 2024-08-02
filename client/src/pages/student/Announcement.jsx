import React from 'react'
import useAuthRedirect from '../../hooks/CheckAuth'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import { Container, Typography } from '@mui/material'
import { fetchStudent } from '../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'

function Announcement() {
  useAuthRedirect
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudent());
}, [dispatch]);
  const userInfo = useSelector((state) => state.user.info);

  return (
    <>
      <PersistentDrawerLeft userInfo={userInfo} />
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