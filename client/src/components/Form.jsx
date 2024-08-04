import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, FormHelperText, TextField, Select, MenuItem, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../features/user/userSlice';
import { useNavigate } from "react-router-dom";
import SimpleAlert from '../components/Alert';
import getTeachers from '../services/getTeacher';
import getCourses from '../api/getCourses';

function Form() {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teacherId, setTeacherId] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeachers();
        const courseData = await getCourses();
        setTeachers(data);
        setCourses(courseData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    CNIC: '',
    courseName: '',
    teacherName: '',
  });

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'teacherName') {
      const selectedTeacher = teachers.find(teacher => teacher.name === value);
      if (selectedTeacher) {
        setTeacherId(selectedTeacher._id);
      }
    }
  };

  const [alert, setAlert] = useState({ severity: '', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(signupUser({...formData, teacherId})).unwrap();
      setAlert({ severity: 'success', message: "Successfully Registered" });
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        password: '',
        CNIC: '',
        courseName: '',
        teacherName: '',
      });
      setTimeout(() => {
        navigate('/student/login');
      }, 1000);
    } catch (err) {
      setAlert({ severity: 'error', message: "User already exists" });
      console.log(err.message);
    }
  };
  return (
    <>
      {alert.message && <SimpleAlert severity={alert.severity} message={alert.message} />}
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="name"
              label="Name"
              variant="outlined"
              value={formData.name || ''}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="email"
              name="email"
              label="Your Email"
              variant="outlined"
              value={formData.email || ''}
              onChange={handleChange}
              size="small"
            />
            <FormHelperText sx={{ fontWeight: 'bold', fontSize: '0.7rem', mt: 0.5 }}>
              We'll never share your email.
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              value={formData.password || ''}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="number"
              name="CNIC"
              label="CNIC"
              variant="outlined"
              value={formData.CNIC || ''}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="course-label">Course Name</InputLabel>
              <Select
                labelId="course-label"
                required
                name="courseName"
                value={formData.courseName || ''}
                label="Course Name"
                onChange={handleChange}
              >
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course.course}>
                    {course.course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="teacherName-label">Teacher Name</InputLabel>
              <Select
                labelId="teacherName-label"
                name="teacherName"
                required
                value={formData.teacherName || ''}
                label="Teacher Name"
                onChange={handleChange}
              >
                {teachers.filter((teacher) => teacher.course === formData.courseName).map((filteredTeacher) => (
                  <MenuItem key={filteredTeacher._id} value={filteredTeacher.name}>
                    {filteredTeacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              type="submit" 
              fullWidth 
              disabled={loading}
              size="small"
              sx={{ mt: 1 }}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default Form;