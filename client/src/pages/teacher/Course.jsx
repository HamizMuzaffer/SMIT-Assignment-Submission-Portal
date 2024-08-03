import React,{useEffect,useState} from 'react'
import MiniDrawer from '../../components/Drawer';
import useAuthRedirect from '../../hooks/CheckAuth';
import { Typography,Container } from '@mui/material';
import { fetchUser } from '../../features/teacher/teacherSlice';
import { useDispatch, useSelector } from 'react-redux';


function TeacherCourse() {
    useAuthRedirect()
    const dispatch = useDispatch();
  const teacherInfo = useSelector((state) => state.teacher.info);
    useEffect(() => {
      const fetchData = async () => {
        dispatch(fetchUser());
        const data = await getAssignments();
        setAssignments(data);
      };
      fetchData();
    }, [dispatch]);

  return (
    <>
            <MiniDrawer teacherInfo={teacherInfo} />
            <Container>
          <Typography variant='h3'>
            Course Outline
          </Typography>
        </Container>

    </>
  )
}

export default TeacherCourse