import { Container,Box, CardMedia, Typography,} from '@mui/material'
import React from 'react'
import Form from '../components/Form'
import image from '../assets/smit.png'
function SignUp() {


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
                <Typography variant='h6' sx={{ fontWeight: '' }}>Student SignUp</Typography>
                  <Form />
            </Box>
        </Container>

    )
}

export default SignUp 