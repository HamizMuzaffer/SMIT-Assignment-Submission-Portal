import React from 'react';
import { Container, Box, CardMedia, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import image from '../../assets/smit.png';
import Form from '../../components/Form';
import { Link } from 'react-router-dom';
import useStudentAuthRedirect from '../../hooks/StudentAuth';

function SignUp() {
    useStudentAuthRedirect()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth={false} disableGutters sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            bgcolor: theme.palette.background.default,
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
                        width: { xs: '40%', sm: '30%', md: '25%', lg: '20%' },
                        height: 'auto',
                        mb: 1,
                    }}
                />
                <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ 
                    fontWeight: 'bold',
                    mb: 1,
                    textAlign: 'center',
                    color: "black"
                }}>
                    Student Sign Up
                </Typography>
                <Form />
                <Button
                    component={Link}
                    to='/student/login'
                    sx={{
                        mt: 1,
                        color: theme.palette.text.secondary,
                        fontSize: '0.8rem',
                    }}
                >
                    Already have an account? Login
                </Button>
            </Box>
        </Container>
    );
}

export default SignUp;