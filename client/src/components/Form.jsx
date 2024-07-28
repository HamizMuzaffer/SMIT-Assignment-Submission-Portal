import {React,useState} from 'react'
import { FormControl, InputLabel, FormHelperText, TextField, Select, MenuItem, Button,Alert,Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import { signupUser } from '../features/user/userSlice';
import { useNavigate } from "react-router-dom";
import  SimpleAlert from '../components/Alert'

function Form() {

  
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    CNIC: '',
    courseName: '',
    teacherName: '',
  });

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

  const handleSubmit = async(event) => {
    event.preventDefault(); 
    try {
      await dispatch(signupUser(formData)).unwrap();
     setAlert({severity : 'success' , message : "Sucessfully Registered"})
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        password: '',
        cnic: '',
        program: '',
        teacherName: '',
      });
      setTimeout(() => {
        navigate('/student/login');
      }, 1000);
    } catch (err) {
      setAlert({severity : 'error' , message : "User already exist "})

      console.log(err.message)
    }
  };

  

  return (
    
    <>
      {alert.message && <SimpleAlert severity={alert.severity} message={alert.message} />}

<form onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          fullWidth
          required 
          name="name"
          label="Name"
          variant="outlined"
          sx={{ width: '400px', my: 1 }}
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          type="email"
          name="email"
          label="Your Email"
          variant="outlined"
          sx={{ width: '400px', my: 1 }}
          value={formData.email}
          onChange={handleChange}
        />
        <FormHelperText sx={{ fontWeight: 'bold', fontSize: 'small' }} id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
        <TextField
          fullWidth
          required
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          sx={{ width: '400px', my: 1 }}
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          type="number"
          name="CNIC"
          label="CNIC"
          variant="outlined"
          sx={{ width: '400px', my: 1 }}
          value={formData.cnic}
          onChange={handleChange}
        />
        <FormControl fullWidth sx={{ width: '400px' }}>
          <InputLabel id="program-label">Course Name</InputLabel>
          <Select
            labelId="program-label"
            required
            name="courseName"
            value={formData.courseName || ''}
            label="Program"
            onChange={handleChange}
          >
            <MenuItem value="Program1">Program1</MenuItem>
            <MenuItem value="Program2">Program2</MenuItem>
            <MenuItem value="Program3">Program3</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ width: '400px', my: 1 }}>
          <InputLabel id="teacherName-label">Teacher Name</InputLabel>
          <Select
            labelId="teacherName-label"
            name="teacherName"
            required
            value={formData.teacherName || ''}
            label="Teacher Name"
            onChange={handleChange}
          >
            <MenuItem value="Teacher1">Teacher1</MenuItem>
            <MenuItem value="Teacher2">Teacher2</MenuItem>
            <MenuItem value="Teacher3">Teacher3</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </FormControl>
    </form>
    </>
  )
}
export default Form