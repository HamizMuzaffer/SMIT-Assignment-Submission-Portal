import React from 'react'
import { FormControl,InputLabel,FormHelperText,TextField,Select, MenuItem,Button} from '@mui/material'

function Form() {
    const [teacherName, setTeacherName] = React.useState('');

    const handleChange = (event) => {
        setTeacherName(event.target.value);
      };
  return (
<>
<FormControl>
          <TextField fullWidth id="outlined-basic" label="Name *" variant="outlined" sx={{width : '400px',my:1}}/>
          <TextField fullWidth type='email' id="outlined-basic" label=" Your Email *" variant="outlined" sx={{width : '400px',my:1}}/>
          <FormHelperText sx={{fontWeight : 'bold', fontSize : 'small'}} id="my-helper-text">We'll never share your email.</FormHelperText>
          <TextField fullWidth  type = "password" id="outlined-basic" label="Passsword" variant="outlined" sx={{width : '400px', my:1}}/>          
         <TextField fullWidth id="outlined-basic" type='number' label="CNIC *" variant="outlined" sx={{width : '400px', my:1}}/>

         <FormControl fullWidth sx={{ width: '400px', }}>
            <InputLabel id="demo-select-small-label">Program</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={teacherName}
              label="Teacher Name"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ width: '400px', my: 1 }}>
            <InputLabel id="demo-select-small-label">Teacher Name</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={teacherName}
              label="Teacher Name"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained">Contained</Button>
        </FormControl>
</>
)}
export default Form