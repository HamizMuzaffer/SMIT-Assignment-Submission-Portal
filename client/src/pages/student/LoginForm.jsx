import React, { useState } from 'react'
import { Container, Box, FormControl, TextField, FormHelperText, Typography, CardMedia, Button } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import image from '../../assets/smit.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SimpleAlert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/user/userSlice';
function LoginForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })

    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [alert, setAlert] = useState({ severity: '', message: '' });

    const handleSubmit = async(event)=>{
         event.preventDefault()

         try {
            await dispatch(loginUser(formData)).unwrap
            setAlert({severity : 'success' , message : "Login Sucessful"})
            setTimeout(()=>{
                navigate('/student/home')
            })

         } catch (error) {
            setAlert({severity : 'error' , message : "Login Failed Incorrect Password or Email"})
            console.log(error.message)
         }
    }


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
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <TextField fullWidth required type='email' id="outlined-basic" label=" Your Email" variant="outlined" sx={{ width: '400px', my: 1 }} />
                            <FormHelperText sx={{ fontWeight: 'bold', fontSize: 'small' }} id="my-helper-text">We'll never share your email.</FormHelperText>
                            <TextField fullWidth onChange={handleChange} required type="password" label="Passsword" variant="outlined" sx={{ width: '400px', my: 1 }} />
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