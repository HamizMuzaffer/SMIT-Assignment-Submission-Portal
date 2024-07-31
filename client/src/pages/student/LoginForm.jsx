import React, { useState } from 'react'
import { Container, Box, FormControl, TextField, FormHelperText, Typography, CardMedia, Button } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import image from '../../assets/smit.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SimpleAlert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/user/userSlice';
import useAuthRedirect from '../../hooks/CheckAuth';
function LoginForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { loading, error } = useSelector((state) => state.user);
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
        event.preventDefault()
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
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '500', }}>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '50%',  // Set width of the Box
                        height: '50vh' // Set height of the Box
                        // Ensure items are stacked vertically
                    }}
                >
                    <CardMedia
                        component="img"
                        image={image}
                        alt="Description"
                        sx={{ width: '30%', height: 'auto', mb: 2 }}
                    />
                    <Typography variant='h6' sx={{ fontWeight: '' }}>Student Login
                    </Typography>
                    <Box sx={{width : '78%'}}>         
                   {alert.message && <SimpleAlert severity={alert.severity} message={alert.message} />}
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <TextField fullWidth value={formData.email} onChange={handleChange} required type='email' id="outlined-basic" label=" Your Email" variant="outlined" name='email' sx={{ width: '400px', my: 1 }} />
                            <FormHelperText sx={{ fontWeight: 'bold', fontSize: 'small' }} id="my-helper-text">We'll never share your email.</FormHelperText>
                            <TextField fullWidth value={formData.password} onChange={handleChange} required type="password" label="Passsword" variant="outlined" name='password' sx={{ width: '400px', my: 1 }} />
                            <Button variant="contained" startIcon={<LoginIcon />} type='submit'>continue</Button>
                        </FormControl>
                    </form>

                    <Link to='/student/signup'>
                        <Button sx={{ mt: 2, color: 'black' }} >
                            Don't have an account? Signup'
                        </Button>
                    </Link>
                </Box>
            </Container>

        </>

    )
}

export default LoginForm