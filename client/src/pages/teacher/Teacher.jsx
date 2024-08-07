import React from 'react';
import MiniDrawer from '../../components/Drawer';
import useTeacherAuthRedirect from '../../hooks/TeacherAuth';
import { fetchUser } from '../../features/teacher/teacherSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NoteIcon from '@mui/icons-material/Note';
import ChatIcon from '@mui/icons-material/Chat';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

function Teacher() {
    useTeacherAuthRedirect()
    const dispatch = useDispatch();
    const teacherInfo = useSelector((state) => state.teacher.info);

    useEffect(() => {
        dispatch(fetchUser());       
         console.log('All cookies:', document.cookie);       
    }, [dispatch]);

    const theme = useTheme();

    return (
        <>
      <MiniDrawer teacherInfo={teacherInfo} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                        Welcome to the Assignment Submission Portal!
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Greetings, {teacherInfo?.name}.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        This portal is designed to facilitate seamless communication and interaction between you and your students. Here are the main features of our portal:
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <NoteIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Notes"
                                secondary="Access and create course notes for yourself."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AnnouncementIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Announcements"
                                secondary="Post important updates and announcements for your students."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentIcon color="action" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Assignments"
                                secondary="Create, assign, and review assignments effortlessly."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <ChatIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Discussions"
                                secondary="Engage in meaningful discussions with your students."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <LeaderboardIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Leaderboard"
                                secondary="Track and display student performance in a leaderboard."
                            />
                        </ListItem>
                    </List>
                    <Box mt={4}>
                        <Typography variant="body1" paragraph>
                            I am here to support and guide you throughout your educational journey. Utilize this portal to stay organized, communicate effectively, and maximize your learning experience. Let's achieve great things together!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            If you have any questions or need assistance, feel free to reach out to me through the "Discussions" tab.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default Teacher;
