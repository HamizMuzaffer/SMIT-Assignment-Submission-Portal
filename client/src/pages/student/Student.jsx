import React from 'react'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import useAuthRedirect from '../../hooks/CheckAuth';
import { fetchStudent } from '../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material';

function Student() {
  useAuthRedirect()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudent());
}, [dispatch]);
const userInfo = useSelector((state) => state.user.info);

  return (
<>
<PersistentDrawerLeft userInfo={userInfo} />
<Typography>Hello</Typography>
</>

)
}

export default Student