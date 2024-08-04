import React, { useEffect, useState } from 'react';
import useAuthRedirect from '../../hooks/CheckAuth';
import { Container, Typography, Card, CardContent, CardHeader, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import MiniDrawer from '../../components/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/teacher/teacherSlice';
import { red } from '@mui/material/colors';
// import { addAnnouncement, getAnnouncements } from '../../features/announcements/announcementSlice'; // Assuming you have this

import '../../App.css';

function TeacherAnnouncement() {
  useAuthRedirect();
  const [announcements, setAnnouncements] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
  });
  const dispatch = useDispatch();
  const teacherInfo = useSelector((state) => state.teacher.info);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUser());
      const data = await getAnnouncements(); // Ensure getAnnouncements fetches announcements from API
      setAnnouncements(data);
    };
    fetchData();
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement({
      ...newAnnouncement,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await dispatch(addAnnouncement(newAnnouncement)); // Ensure addAnnouncement is implemented
    setOpen(false);
    // Re-fetch announcements or update state
    const data = await getAnnouncements(); 
    setAnnouncements(data);
  };

  return (
    <>
      <MiniDrawer teacherInfo={teacherInfo} />
      <Container sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            All the Major Announcements
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 4 }}>
            Add Announcement
          </Button>
          {announcements?.map((announcement) => (
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

        {/* Add Announcement Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Announcement</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              name="title"
              value={newAnnouncement.title}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              fullWidth
              variant="outlined"
              name="content"
              value={newAnnouncement.content}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default TeacherAnnouncement;
