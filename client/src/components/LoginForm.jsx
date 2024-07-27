import React from 'react'
import { FormControl,Button,TextField,FormHelperText } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';

function LoginForm() {
  return (
    <FormControl>
    <TextField fullWidth type='email' id="outlined-basic" label=" Your Email *" variant="outlined" sx={{width : '400px',my:1}}/>
    <FormHelperText sx={{fontWeight : 'bold', fontSize : 'small'}} id="my-helper-text">We'll never share your email.</FormHelperText>
    <TextField fullWidth  type = "password" label="Passsword *" variant="outlined" sx={{width : '400px', my:1}}/>  
    <Button variant="contained" startIcon = {<LoginIcon />}>continue</Button>
    </FormControl>
  )
}

export default LoginForm