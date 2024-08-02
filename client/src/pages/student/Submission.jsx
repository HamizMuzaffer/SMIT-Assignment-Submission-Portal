import React, { useEffect, useState } from 'react';
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft';
import { fetchStudent } from '../../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { Box, Container, Typography, TextField, Button, Card, CardContent, Alert } from '@mui/material';
import getSubmissions from '../../api/submissions';

const drawerWidth = 240;

function Submission() {
  const [assignment, setAssignment] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.info);
  const [open, setOpen] = useState(true);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/teacher/assignment/${id}`);
      setAssignment(response.data);
      const submissionResponse = await getSubmissions();
      setSubmissions(submissionResponse);
      dispatch(fetchStudent());
    };
    fetchData();
  }, [dispatch, id]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/student/assignment/submission', {
        assignmentId: assignment._id,
        submissionLink: submissionUrl,
        studentId: userInfo._id
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  const isSubmission = submissions.find((submission) => submission.studentId === userInfo?._id);

  return (
    <Box sx={{ display: 'flex' }}>
      <PersistentDrawerLeft userInfo={userInfo} open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: `-${drawerWidth}px`,
          ...(open && {
            transition: (theme) => theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          }),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: open ? 'flex-start' : 'center',
            flexDirection: 'column',
            mt: 8,
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: open ? 0 : `${drawerWidth}px`,
              transition: (theme) => theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ flex: 1, mb: { xs: 3, md: 0 } }}>
                <Typography variant="h3" sx={{ textAlign: 'start', pb: 1 }}>
                  {assignment?.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'grey', textAlign: 'start' }}>
                  Posted By: {userInfo?.teacherName}
                </Typography>
                <Typography variant="h5" sx={{ textAlign: 'start', color: 'black', mt: 5 }}>
                  {assignment?.description}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Card sx={{ width: '100%', bgcolor: 'whitesmoke', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 'solid grey', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Post Your Assignment Link Here
                    </Typography>
                    {!isSubmitted || !isSubmission ? (
                      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                          fullWidth
                          required
                          type="url"
                          name="assignment"
                          label="Your Assignment Link"
                          variant="outlined"
                          value={submissionUrl}
                          onChange={(e) => setSubmissionUrl(e.target.value)}
                          sx={{ width: '100%', my: 1 }}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          endIcon={<SendIcon />}
                          sx={{ px: 5, mt: 2 }}
                        >
                          Submit Assignment
                        </Button>
                      </form>
                    ) : (
                      <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
                        Your assignment has been submitted successfully!
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Submission;
