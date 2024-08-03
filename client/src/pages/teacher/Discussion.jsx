import React, { useEffect, useState } from 'react'
import MiniDrawer from '../../components/Drawer';
import useAuthRedirect from '../../hooks/CheckAuth';
import { Typography, Container, Box, TextField, Button, Paper, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/teacher/teacherSlice';
import SendIcon from '@mui/icons-material/Send';

function TeacherDiscussion() {
    useAuthRedirect()
    const dispatch = useDispatch();
    const teacherInfo = useSelector((state) => state.teacher.info);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { text: "Welcome to the discussion!", sender: 'system' },
        { text: "Hello, how can I help you?", sender: 'teacher' },
        { text: "I have a question about the course.", sender: 'student' },
    ]);

    const theme = useTheme();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setMessages([...messages, { text: message, sender: 'teacher' }]);
            setMessage('');
        }
    }

    return (
        <>
            <MiniDrawer teacherInfo={teacherInfo} />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Typography variant='h3' sx={{ mb: 3, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                    Discussion
                </Typography>
                <Paper elevation={3} sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                        {messages.map((msg, index) => (
                            <Box key={index} sx={{ 
                                mb: 2, 
                                display: 'flex', 
                                justifyContent: msg.sender === 'teacher' ? 'flex-end' : 
                                                msg.sender === 'student' ? 'flex-start' : 'center'
                            }}>
                                <Paper elevation={1} sx={{ 
                                    p: 1, 
                                    maxWidth: '70%',
                                    backgroundColor: msg.sender === 'teacher' ? theme.palette.primary.light : 
                                                    msg.sender === 'student' ? theme.palette.grey[200] : theme.palette.info.light
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
                                        disabled={message.trim() === ''}
                                        sx={{ ml: 1 }}
                                    >
                                        <SendIcon />
                                    </Button>
                                )
                            }}
                        />
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default TeacherDiscussion