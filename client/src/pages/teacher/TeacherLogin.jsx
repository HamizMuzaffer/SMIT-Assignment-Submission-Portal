import React, {useState} from 'react'
import { FormControl,CardMedia,FormHelperText,TextField,Typography,Button, Container, Box} from '@mui/material'
import image from '../../assets/smit.png'
import LoginIcon from '@mui/icons-material/Login';
import SimpleAlert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/teacher/teacherSlice';
import { useDispatch, useSelector } from 'react-redux';
import useAuthRedirect from '../../hooks/CheckAuth';

function Login() {

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
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '500', }}>
        <Box sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column',width: '50%',height: '50vh'}}>
        <CardMedia component="img" image={image} alt="Description" sx={{ width: '30%', height: 'auto', mb: 2 }}/>
                <Typography variant='h6' sx={{ fontWeight: '' }}>Login as a Trainer</Typography>
                <Box sx={{width : '78%'}}>         
                   {alert.message && <SimpleAlert severity={alert.severity} message={alert.message} />}
                    </Box>
                <form onSubmit={handleSubmit}>
          <FormControl>
          <TextField fullWidth type='email' id="outlined-basic" onChange={handleChange} label=" Your Email *" name='email' variant="outlined" sx={{width : '400px',my:1}}/>
          <FormHelperText sx={{fontWeight : 'bold', fontSize : 'small'}} id="my-helper-text">We'll never share your email.</FormHelperText>
          <TextField fullWidth  type = "password" onChange={handleChange} name='password' label="Passsword *" variant="outlined" sx={{width : '400px', my:1}}/>  
          <Button type='submit' variant="contained" startIcon = {<LoginIcon />}>continue</Button>
          </FormControl>
          </form>
        </Box>
      </Container>
  )
}

export default Login