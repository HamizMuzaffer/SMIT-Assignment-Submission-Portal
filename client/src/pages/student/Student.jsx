import React, { useEffect } from 'react';
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft';
import { fetchStudent } from '../../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Paper, Box, Avatar, useTheme } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import useStudentAuthRedirect from '../../hooks/StudentAuth';

function Student() {
  useStudentAuthRedirect()
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.info);

  useEffect(() => {
    dispatch(fetchStudent());
  }, [dispatch]);

  const theme = useTheme();

  return (
    <>
      <PersistentDrawerLeft userInfo={userInfo} />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor: theme.palette.background.default }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 72, height: 72, mx: 'auto', mb: 2 }}>
            <SchoolIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
            Welcome to Our IT Courses!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem', lineHeight: 1.6 }}>
            We are thrilled to introduce you to our esteemed IT instructor,
            <Typography component="span" variant="h5" sx={{ display: 'inline', fontWeight: 'bold', color: theme.palette.secondary.main }}>
              {" "} {userInfo?.teacherName}
            </Typography>.
            Hailing from the prestigious Saylani Mass IT program, {userInfo?.teacherName} brings a wealth of knowledge and experience in the field of Information Technology.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <AssignmentIcon color="action" fontSize="large" />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Assignments
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <ChatIcon color="action" fontSize="large" />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Discussion Tab
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            Through this assignment submission portal, Mr. {userInfo?.teacherName} will guide you on your journey to mastering various IT courses. Whether you are delving into the basics of programming, exploring the intricacies of web development, or learning about the latest advancements in technology, Mr. {userInfo?.teacherName} is here to support and challenge you every step of the way.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem', lineHeight: 1.6 }}>
            In addition to providing assignments and course materials, Mr. {userInfo?.teacherName} is available to assist you through our dedicated "Discuss" tab. Here, you can engage directly with him to ask questions, seek clarification, and receive personalized feedback on your work.
          </Typography>
          <Typography variant="h6" sx={{ mt: 3, color: theme.palette.primary.main }}>
            Let's unlock your potential together with the expertise and guidance of {userInfo?.teacherName} from Saylani Mass IT!
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default Student;
