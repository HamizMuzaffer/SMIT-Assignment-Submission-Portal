import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardHeader, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import MiniDrawer from '../../components/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/teacher/teacherSlice';
import { red } from '@mui/material/colors';
import { addAnnouncement, fetchAnnouncements, deleteAnnouncement } from '../../features/announcements/announcementsSlice';
import '../../App.css';
import useTeacherAuthRedirect from '../../hooks/TeacherAuth';
function TeacherAnnouncement() {
  useTeacherAuthRedirect()
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
      await dispatch(fetchUser());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (teacherInfo && teacherInfo._id) {
      const fetchData = async () => {
        const result = await dispatch(fetchAnnouncements(teacherInfo._id));
        setAnnouncements(result.payload || []); // Ensure announcements is always an array
      };
      fetchData();
    }
  }, [dispatch, teacherInfo]);

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
    await dispatch(addAnnouncement({ ...newAnnouncement, teacherId: teacherInfo._id, teacherName: teacherInfo.name }));
    setOpen(false);
    const result = await dispatch(fetchAnnouncements(teacherInfo._id));
    setAnnouncements(result.payload || []); // Ensure announcements is always an array
  };

  const handleDelete = async (announcementId) => {
    await dispatch(deleteAnnouncement(announcementId));
    const result = await dispatch(fetchAnnouncements(teacherInfo._id));
    setAnnouncements(result.payload || []); // Ensure announcements is always an array
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
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <Card key={announcement._id} sx={{ mb: 4 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="teacher">
                      {announcement.teacherName.charAt(0)}
                    </Avatar>
                  }
                  title={announcement.title}
                  subheader={`Posted by: ${announcement.teacherName} on ${new Date(announcement.createdAt).toLocaleDateString()}`}
                  action={
                    <IconButton aria-label="delete" onClick={() => handleDelete(announcement._id)}>
                      <Delete />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Typography variant="body1" color="textSecondary">
                    {announcement.content}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No announcements found.</Typography>
          )}
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
