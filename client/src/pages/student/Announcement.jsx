import React, { useEffect, useState } from 'react';
import useAuthRedirect from '../../hooks/CheckAuth';
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft';
import { Container, Typography, Card, CardContent, CardHeader, Avatar, Box } from '@mui/material';
import { fetchStudent } from '../../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { red } from '@mui/material/colors';

function Announcement() {
  useAuthRedirect();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.info);
  const [open, setOpen] = useState(true);
  const drawerWidth = 240
  const announcements = [
    {
      id: 1,
      title: 'Midterm Exam Schedule',
      content: 'The midterm exams will start from next Monday. Please prepare accordingly.',
      date: '2024-08-05',
      teacher: 'Mr. John Doe',
    },
    {
      id: 2,
      title: 'Assignment Submission Deadline',
      content: 'The deadline for the assignment submission has been extended to next Friday.',
      date: '2024-08-03',
      teacher: 'Ms. Jane Smith',
    },
  ];

  useEffect(() => {
    dispatch(fetchStudent());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PersistentDrawerLeft userInfo={userInfo} open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <Container sx={{
        
      }}>
        <Box sx={{marginLeft: `-${drawerWidth}px`,
        ...(open && {
          transition: theme => theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        }),}}>
        <Typography variant="h4" sx={{ mb: 4,textAlign : 'center' }}>
          All the Major Announcements
        </Typography>
        {announcements.map((announcement) => (
          <Card key={announcement.id} sx={{ mb: 4 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="teacher">
                  {announcement.teacher.charAt(0)}
                </Avatar>
              }
              title={announcement.title}
              subheader={`Posted by: ${announcement.teacher} on ${new Date(announcement.date).toLocaleDateString()}`}
            />
            <CardContent>
              <Typography variant="body1" color="textSecondary">
                {announcement.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
        </Box>
      </Container>
    </>
  );
}

export default Announcement;
