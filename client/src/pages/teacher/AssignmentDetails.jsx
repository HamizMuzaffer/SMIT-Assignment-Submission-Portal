import React from 'react'
import MiniDrawer from '../../components/Drawer';
import useAuthRedirect from '../../hooks/CheckAuth'
import { fetchUser } from '../../features/teacher/teacherSlice';
import {useDispatch,useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

function AssignmentDetails() {
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);
    useAuthRedirect()
    const teacherInfo = useSelector((state) => state.teacher.info);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchUser());
            const response = await axios.get(`http://localhost:3000/teacher/assignment/${id}`);
            setAssignment(response.data);
        };
        fetchData();
    }, [dispatch]);
  return (
<>
<MiniDrawer teacherInfo={teacherInfo}/>
<Typography>{assignment?.title}</Typography>
</> 
)
}

export default AssignmentDetails