import React, { useEffect, useState } from 'react'
import MiniDrawer from '../../components/Drawer';
import useAuthRedirect from '../../hooks/CheckAuth';
import { Typography, Container, List, ListItem, ListItemText, Box, TextField, Button, Paper, useTheme, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/teacher/teacherSlice';
import { sendMessage, fetchMessages } from '../../features/messages/messagesSlice';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function TeacherDiscussion() {
    useAuthRedirect()
    const dispatch = useDispatch();
    const teacherInfo = useSelector((state) => state.teacher.info);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
   
    const theme = useTheme();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (teacherInfo && teacherInfo._id) {
          const fetchStudents = async () => {
            try {
              const response = await axios.get(`http://localhost:3000/messages/${teacherInfo._id}`);
              console.log(response.data)
              setStudents(response.data);
            } catch (error) {
              console.error('Error fetching students:', error);
              setStudents([]);
              // Optionally, set an error state to display to the user
              setError('Failed to fetch students. Please try again later.');
            }
          };
          fetchStudents();
        }
      }, [teacherInfo]);

    useEffect(() => {
        if (selectedStudent && teacherInfo && teacherInfo._id && selectedStudent._id) {
            dispatch(fetchMessages({ senderId: teacherInfo._id, receiverId: selectedStudent._id }))
                .unwrap()
                .then(setMessages)
                .catch(error => console.error('Error fetching messages:', error));
        }
    }, [selectedStudent, dispatch, teacherInfo]);

    const handleSendMessage = () => {
        if (message.trim() !== '' && selectedStudent && teacherInfo && teacherInfo._id) {
            dispatch(sendMessage({
                text: message,
                senderId: teacherInfo._id,
                receiverId: selectedStudent._id,
            }))
                .unwrap()
                .then(newMessage => {
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                    setMessage('');
                })
                .catch(error => console.error('Error sending message:', error));
        }
    }

    return (
        <>
            <MiniDrawer teacherInfo={teacherInfo} />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Typography variant='h3' sx={{ mb: 3, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
                    Discussion
                </Typography>
                <Grid container spacing={2} sx={{ height: 'calc(100vh - 200px)' }}>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper elevation={3} sx={{ height: '100%', overflowY: 'auto' }}>
                            <List>
                                {students.map((student) => (
                                    <ListItem
                                        button
                                        key={student._id}
                                        onClick={() => setSelectedStudent(student)}
                                        selected={selectedStudent && selectedStudent._id === student._id}
                                    >
                                        <ListItemText primary={student.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                                {messages.map((msg, index) => (
                                    <Box key={index} sx={{
                                        mb: 2,
                                        display: 'flex',
                                        justifyContent: teacherInfo && msg.senderId === teacherInfo._id ? 'flex-end' : 'flex-start'
                                    }}>
                                        <Paper elevation={1} sx={{
                                            p: 1,
                                            maxWidth: '70%',
                                            backgroundColor: teacherInfo && msg.senderId === teacherInfo._id ? theme.palette.primary.light : theme.palette.grey[200]
                                        }}>
                                            <Typography variant="body1">{msg.text}</Typography>
                                        </Paper>
                                    </Box>
                                ))}
                            </Box>
                            <Box sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Type a message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <Button
                                                onClick={handleSendMessage}
                                                disabled={message.trim() === '' || !selectedStudent || !teacherInfo}
                                                sx={{ ml: 1 }}
                                            >
                                                <SendIcon />
                                            </Button>
                                        )
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default TeacherDiscussion