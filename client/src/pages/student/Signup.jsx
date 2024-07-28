import { Container, Box, CardMedia, Typography, Button } from '@mui/material'
import React from 'react'
import image from '../../assets/smit.png'
import Form from '../../components/Form'
import { Link } from 'react-router-dom'

function SignUp() {
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
                    <Typography variant='h6' sx={{ fontWeight: '' }}>Student Sign Up
                    </Typography>
                     < Form />
                     <Link to='/student/login'>
                    <Button  sx={{ mt: 2, color: 'black' }} >
                        Already have an account? Login' 
                    </Button>
                    </Link>
                 </Box>
            </Container>
        </>

    )
}

export default SignUp 