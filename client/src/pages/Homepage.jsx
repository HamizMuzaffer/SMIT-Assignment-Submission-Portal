import { Box, Container, CardMedia, Button } from '@mui/material';
import React from 'react';
import smitImage from '../assets/smit.png';
import { Link } from 'react-router-dom';
import { PiStudentBold } from "react-icons/pi";
import { FaMouse } from "react-icons/fa";

function Homepage() {
  return (
    <>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', }}>
        <Box
          sx={{
            bgcolor: 'white',
            width: { xs: '90%', sm: '70%', md: '50%', lg: '500px' },
            height: { xs: 'auto', md: '50vh' },
            border: '1px solid',
            borderColor : 'whitesmoke',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: { xs: 2, md: 3 },
            boxShadow: 3,
          }}
        >
          <CardMedia
            component="img"
            image={smitImage}
            alt="Description"
            sx={{ width: { xs: '50%', md: '30%' }, height: 'auto', mb: 2 }}
          />
          <Link to='/teacher/login' style={{ textDecoration: 'none', width: '100%' }}>
            <Button
              variant='contained'
              sx={{ width: '100%', px: 2, py: 1, m: 1, fontSize: { xs: '0.8rem', sm: '1rem' } }}
              startIcon={<FaMouse />}
            >
              Continue as a Teacher
            </Button>
          </Link>
          <Link to='/student/signup' style={{ textDecoration: 'none', width: '100%' }}>
            <Button
              variant='contained'
              startIcon={<PiStudentBold />}
              sx={{ width: '100%', px: 2, py: 1, m: 1, fontSize: { xs: '0.8rem', sm: '1rem' } }}
            >
              Continue as a Student
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default Homepage;
