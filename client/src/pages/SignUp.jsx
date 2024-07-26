import { Container,Box, CardMedia, Typography,Button} from '@mui/material'
import React from 'react'
import Form from '../components/Form'
import LoginForm from '../components/LoginForm'
import image from '../assets/smit.png'
function SignUp() {
   
        const [isSignup, setIsSignup] = React.useState(true);
    
        const toggleForm = () => {
            setIsSignup(!isSignup);
        };

    return (
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
                <Typography variant='h6' sx={{ fontWeight: '' }}>{isSignup ? 'Student Sign Up ' : 'Student Log In'}
                </Typography>
                {isSignup ? <Form /> : <LoginForm />}
                <Button onClick={toggleForm} sx={{ mt: 2, color : 'black' }} >
                    {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </Button>            </Box>
        </Container>

    )
}

export default SignUp 