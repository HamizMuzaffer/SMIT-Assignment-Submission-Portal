import React, { useEffect, useState } from 'react';
import { FormControl, CardMedia, FormHelperText, TextField, Typography, Button, Container, Box, useTheme, useMediaQuery } from '@mui/material';
import image from '../../assets/smit.png';
import LoginIcon from '@mui/icons-material/Login';
import SimpleAlert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/teacher/teacherSlice';
import { useDispatch, useSelector } from 'react-redux';
import useTeacherAuthRedirect from '../../hooks/TeacherAuth';

function Login() {
    useEffect(() => {
        useTeacherAuthRedirect()    
    }, [])
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const [alert, setAlert] = useState({ severity: '', message: '' });
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(loginUser(formData)).unwrap();
            setAlert({ severity: 'success', message: "Login Successful" });
            setTimeout(() => {
                navigate('/teacher/home');
            }, 1000);
        } catch (error) {
            setAlert({ severity: 'error', message: error.error || "Login Failed: Incorrect Password or Email" });
            console.error("Error during login:", error);
        }
    };

    return (
        <Container maxWidth={false} disableGutters sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            bgcolor: theme.palette.background.default,
            p: { xs: 2, sm: 3 },
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: { xs: '95%', sm: '80%', md: '60%', lg: '50%' },
                    p: { xs: 2, sm: 3 },
                    boxShadow: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                }}
            >
                <CardMedia
                    component="img"
                    image={image}
                    alt="SMIT Logo"
                    sx={{
                        width: { xs: '50%', sm: '40%', md: '30%', lg: '25%' },
                        height: 'auto',
                        mb: 2,
                    }}
                />
                <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ 
                    fontWeight: 'bold',
                    mb: 2,
                    textAlign: 'center',
                    color: "black"
                }}>
                    Login as a Trainer
                </Typography>
                {alert.message && <SimpleAlert severity={alert.severity} message={alert.message} />}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            required
                            type='email'
                            id="email"
                            label="Your Email"
                            variant="outlined"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            required
                            type="password"
                            id="password"
                            label="Password"
                            variant="outlined"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <Button 
                            type='submit' 
                            variant="contained" 
                            startIcon={<LoginIcon />} 
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </Container>
    );
}

export default Login;
