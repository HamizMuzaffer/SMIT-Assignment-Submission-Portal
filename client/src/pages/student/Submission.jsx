import React, { useEffect, useState } from 'react';
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft';
import { fetchStudent } from '../../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { Box, Container, Typography, TextField, Button, Card, CardContent, Alert, Paper } from '@mui/material';
import getSubmissions from '../../api/submissions';

const drawerWidth = 240;

function Submission() {
  const [assignment, setAssignment] = useState();
  const { id } = useParams();
  const userInfo = useSelector((state) => state.user.info);
  const [open, setOpen] = useState(true);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [isSubmission, setIsSubmission] = useState(null);
  const [isDueDatePassed, setIsDueDatePassed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/teacher/assignment/${id}`);
      setAssignment(response.data);
      const submissionResponse = await getSubmissions();
      setSubmissions(submissionResponse);
      const dueDate = new Date(response.data.dueDate);
      setIsDueDatePassed(new Date() > dueDate);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (userInfo && submissions.length > 0 && assignment) {
      const existingSubmission = submissions.find((submission) => submission.assignmentId === assignment._id && submission.studentId === userInfo._id);
      setIsSubmission(existingSubmission);
      if (existingSubmission) {
        setIsSubmitted(true);
      }
    }
  }, [userInfo, submissions, assignment]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/student/assignment/submission', {
        assignmentId: assignment._id,
        submissionLink: submissionUrl,
        studentId: userInfo._id,
        studentName: userInfo.name,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  const renderSubmissionSection = () => {
    if (isDueDatePassed && !isSubmitted) {
      return (
        <Alert severity="error" sx={{ mt: 2 }}>
          The due date for this assignment has passed. Submissions are no longer accepted.
        </Alert>
      );
    } else if (isSubmitted || isSubmission) {
      return (
        <>
        <Alert severity="success" sx={{ mt: 2 }}>
            Your assignment has been submitted successfully!
          </Alert>
          {
            isSubmission ? (
              isSubmission.rating === null ? (
                <Typography sx={{ textAlign: 'center', color: 'black', mt: 5 }}>Rating: Not Marked Yet</Typography>
              ) : (
                <Typography sx={{ textAlign: 'center', color: 'black', mt: 5 }}>Rating: {isSubmission.rating}/5</Typography>
              )
            ) : null
          }
          
        </>
      );
    } else {
      return (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            type="url"
            name="assignment"
            label="Your Assignment Link"
            variant="outlined"
            value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              px: 4,
              py: 1,
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            Submit Assignment
          </Button>
        </form>
      );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <PersistentDrawerLeft
        userInfo={userInfo}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
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
        <Container maxWidth="lg" sx={{ mt: { xs: 8, sm: 10 } }}>
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: 'primary.main',
                wordBreak: 'break-word',
              }}
            >
              {assignment?.title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
              Posted By: {userInfo?.teacherName}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              Due Date: {new Date(assignment?.dueDate).toLocaleString()}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: 'text.primary',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {assignment?.description}
            </Typography>

            <Card sx={{ bgcolor: 'background.default', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                  Submit Your Assignment
                </Typography>
                {renderSubmissionSection()}
              </CardContent>
            </Card>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Submission;