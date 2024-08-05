import React, { useEffect, useState } from 'react'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import useAuthRedirect from '../../hooks/CheckAuth';
import { Typography, Container, Box } from '@mui/material';
import { fetchStudent } from '../../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import getTeachers from '../../services/getTeacher';
import getAssignments from '../../api/assignments';
import ViewCard from '../../components/ViewCard';

const drawerWidth = 240;

function Assignments() {
  const userInfo = useSelector((state) => state.user.info);
  const [teachers, setTeachers] = useState([])
  const [assignments, setAssignments] = useState([])
  const [filteredTeacher, setFilteredTeacher] = useState(null);
  const [open, setOpen] = useState(true);

  useAuthRedirect()
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStudent());
        const data = await getTeachers();
        setTeachers(data);
  
        const response = await getAssignments();
        setAssignments(response);
  
        if (userInfo) {
          const teacher = teachers.find((teacher) => teacher.name === userInfo.teacherName);
          setFilteredTeacher(teacher);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [dispatch, userInfo]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <PersistentDrawerLeft userInfo={userInfo} open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: theme => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: `-${drawerWidth}px`,
          ...(open && {
            transition: theme => theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          }),
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: open ? 'flex-start' : 'center' }}>
          <Container 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mt: 8,
              ml: open ? 0 : `${drawerWidth}px`,
              transition: theme => theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <Typography variant='h3' sx={{ mb: 4 }}>
              Assignments
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
              {assignments
                .filter((assignment) => assignment.teacherId === filteredTeacher?._id)
                .map((filteredAssignment) => (
                  <ViewCard key={filteredAssignment._id} assignment={filteredAssignment} teacher={filteredTeacher}/>
                ))}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Assignments