import React, { useEffect, useState } from 'react'
import { Typography, Container, Box,TextField, Button, Paper, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudent } from '../../features/user/userSlice';
import { sendMessage, fetchMessages } from '../../features/messages/messagesSlice';
import SendIcon from '@mui/icons-material/Send';
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft';
import useStudentAuthRedirect from '../../hooks/StudentAuth';


function Discussion() {
    useStudentAuthRedirect()
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.info);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const theme = useTheme();

    useEffect(() => {
        dispatch(fetchStudent());
    }, [dispatch]);

    useEffect(() => {
        if (userInfo && userInfo.teacherId) {
            dispatch(fetchMessages({ senderId: userInfo._id, receiverId: userInfo.teacherId}))
            .unwrap()
            .then(setMessages)
            .catch(error => console.error('Error fetching messages:', error));
        }
      }, [userInfo, dispatch]);

      const handleSendMessage = async () => {
        if (message.trim() !== '' && userInfo && userInfo.teacherId) {
            await dispatch(sendMessage({
              text: message,
              senderId: userInfo._id,
              receiverId: userInfo.teacherId,
            }))
            
            .unwrap()
            .then(newMessage => {
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setMessage('');
            })
            .catch(error => console.error('Error sending message:', error));
        }
      };

    return (
        <>
            <PersistentDrawerLeft userInfo = {userInfo}/>
            <Container maxWidth="xl" sx={{ mt: 0, mb: 4 }}>
                <Typography variant='h3' sx={{ mb: 1, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                    Discussion
                </Typography>
                <Paper elevation={3} sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                        {messages.map((msg, index) => (
                            <Box key={index} sx={{ 
                                mb: 2, 
                                display: 'flex', 
                                justifyContent: msg.senderId === userInfo._id ? 'flex-end' :  'flex-start'
                                                
                            }}>
                                <Paper elevation={1} sx={{ 
                                    p: 1, 
                                    maxWidth: '70%',
                                    backgroundColor: msg.sender === userInfo._id ? theme.palette.primary.light : 
                                                    msg.sender === userInfo.teacherId ? theme.palette.grey[200] : theme.palette.info.light
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

export default Discussion