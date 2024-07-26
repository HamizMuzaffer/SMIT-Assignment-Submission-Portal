import React from 'react'
import { FormControl,CardMedia,FormHelperText,TextField,Typography,Button, Container, Box} from '@mui/material'
import image from '../assets/smit.png'
import LoginIcon from '@mui/icons-material/Login';

function Login() {
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
      }}>
        <CardMedia
                    component="img"
                    image={image}
                    alt="Description"
                    sx={{ width: '30%', height: 'auto', mb: 2 }}
                />
                <Typography variant='h6' sx={{ fontWeight: '' }}>Login as a Trainer</Typography>
          <FormControl>
          <TextField fullWidth type='email' id="outlined-basic" label=" Your Email *" variant="outlined" sx={{width : '400px',my:1}}/>
          <FormHelperText sx={{fontWeight : 'bold', fontSize : 'small'}} id="my-helper-text">We'll never share your email.</FormHelperText>
          <TextField fullWidth  type = "password" id="outlined-basic" label="Passsword *" variant="outlined" sx={{width : '400px', my:1}}/>  
          <Button variant="contained" startIcon = {<LoginIcon />}>continue</Button>
          </FormControl>
        </Box>
      </Container>
  )
}

export default Login