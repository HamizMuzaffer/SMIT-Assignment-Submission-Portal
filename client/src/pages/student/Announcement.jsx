import React, { useEffect, useState } from 'react';
import useStudentAuthRedirect from '../../hooks/StudentAuth';
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft';
import { Container, Typography, Card, CardContent, CardHeader, Avatar, Box } from '@mui/material';
import { fetchStudent } from '../../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { red } from '@mui/material/colors';
import { fetchAllAnnouncements } from '../../features/announcements/announcementsSlice';

function Announcement() {
  useStudentAuthRedirect()
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.info);
  const [open, setOpen] = useState(true);
  const drawerWidth = 240;
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    dispatch(fetchStudent());
  }, [dispatch]);

  useEffect(() => {
    const fetchAnnouncementsData = async () => {
      if (userInfo && userInfo.teacherName) {
        const result = await dispatch(fetchAllAnnouncements());
        setAnnouncements(result.payload || []); // Ensure announcements is always an array
      }
    };

    fetchAnnouncementsData();
  }, [dispatch, userInfo]);

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
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
          transition: theme => theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        }),
      }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            All the Major Announcements
          </Typography>
          {announcements.filter((announcement) => announcement.teacherName === userInfo.teacherName).map((announcement) => (
            <Card key={announcement.id} sx={{ mb: 4 }}>
              <CardHeader sx={{textAlign : 'center'}}
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="teacher">
                    R
                  </Avatar>
                }
                title={announcement.title}
                subheader={`Posted by: ${announcement.teacherName} on ${new Date(announcement.createdAt).toLocaleDateString()}`}
              />
              <CardContent>
                <Typography variant="body1" color="textSecondary" sx={{textAlign : 'center'}}>
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
