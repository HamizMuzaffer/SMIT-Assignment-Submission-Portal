import React, { useEffect, useState } from 'react';
import MiniDrawer from '../../components/Drawer';
import axios from 'axios';
import useTeacherAuthRedirect from '../../hooks/TeacherAuth';
import { Typography, Container, Box, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import SelectSmall from '../../components/Select';
import ModalComponent from '../../components/Modal';
import { fetchUser } from '../../features/teacher/teacherSlice';
import getAssignments from '../../api/assignments';
import BasicCard from '../../components/Card';

function TeacherAssignments() {
  useTeacherAuthRedirect()
  const dispatch = useDispatch();
  const teacherInfo = useSelector((state) => state.teacher.info);
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUser());
      const data = await getAssignments();
      setAssignments(data);
    };
    fetchData();
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('dueDate', data.dueDate);
      formData.append('file', data.file);
      formData.append('teacherId', teacherInfo._id);

      await axios.post('http://localhost:3000/teacher/assignment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setOpen(false);
      // Refresh assignments after successful submission
      const updatedAssignments = await getAssignments();
      setAssignments(updatedAssignments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MiniDrawer teacherInfo={teacherInfo} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" align="center" sx={{ mb: 3, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
          Assignments
        </Typography>
        <Box
          sx={{
            width: '100%',
            bgcolor: 'whitesmoke',
            borderRadius: '20px',
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
          }}
        >
          <SelectSmall />
          <Button
            startIcon={<AddIcon />}
            onClick={handleOpen}
            fullWidth={isMobile}
            sx={{
              bgcolor: '#1976d2',
              color: 'white',
              '&:hover': { bgcolor: '#1565c0' },
              py: 1,
            }}
          >
            Add New Assignment
          </Button>
        </Box>
        <ModalComponent open={open} handleClose={handleClose} onSubmit={handleSubmit} loading={loading} />
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {assignments
            .filter((assignment) => assignment.teacherId === teacherInfo?._id)
            .map((filteredAssignment) => (
              <Grid item xs={12} sm={6} md={4} key={filteredAssignment._id}>
                <BasicCard assignments={filteredAssignment} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default TeacherAssignments;