import React, { useState } from 'react';
import { Container, Box, FormControl, TextField, FormHelperText, Typography, CardMedia, Button, useTheme, useMediaQuery } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import image from '../../assets/smit.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SimpleAlert from '../../components/Alert';
import { loginUser } from '../../features/user/userSlice';

function LoginForm() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const [alert, setAlert] = useState({ severity: '', message: '' });
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(loginUser(formData)).unwrap();
            setAlert({ severity: 'success', message: "Login Successful" });
            setTimeout(() => {
                navigate('/student/home');
            }, 1000);
        } catch (error) {
            setAlert({ severity: 'error', message: "Login Failed: Incorrect Password or Email" });
            console.error(error); // Log the entire error for debugging purposes
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
                    Student Login
                </Typography>
                {alert.message && <SimpleAlert severity={alert.severity} message={alert.message} />}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            required
                            value={formData.email}
                            onChange={handleChange}
                            type='email'
                            id="email"
                            label="Your Email"
                            variant="outlined"
                            name='email'
                            sx={{ mb: 2 }}
                        />
                        <FormHelperText sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}>
                            We'll never share your email.
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            label="Password"
                            variant="outlined"
                            name='password'
                            sx={{ mb: 2 }}
                        />
                        <Button 
                            variant="contained" 
                            startIcon={<LoginIcon />} 
                            type='submit' 
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </FormControl>
                </form>
                <Button 
                    component={Link}
                    to='/student/signup'
                    sx={{ mt: 2, color: 'black' }}
                >
                    Don't have an account? Sign Up
                </Button>
            </Box>
        </Container>
    );
}

export default LoginForm;
