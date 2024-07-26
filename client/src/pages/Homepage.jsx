import { Box, Container, CardMedia, Button, } from '@mui/material'
import React from 'react'
import smitImage from '../assets/smit.png'
import { Link } from 'react-router-dom'
import { PiStudentBold} from "react-icons/pi";
import { FaMouse } from "react-icons/fa";


function Homepage() {
  return (
    <>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', }} >
        <Box sx={{ bgcolor: 'white', width: '500px', height: '50vh', border: 'ButtonHighlight', borderColor: '#0b73b7', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <CardMedia
            component="img"
            image={smitImage}
            alt="Description"
            sx={{ width: '30%', height: '30%', }}
          />
          <Link to='/login'>
            <Button variant='contained' sx={{ px: 8, py: 1, m: 2 }} startIcon = {<FaMouse />}>
              Continue as a Teacher
            </Button>
          </Link>
          <Link to='/signup'>
            <Button variant='contained' startIcon = {<PiStudentBold />} sx={{ px: 8, py: 1, m: 2 }}>
              Continue as a Student
            </Button>
          </Link>
          </Box>
      </Container>
    </>
  )
}

export default Homepage