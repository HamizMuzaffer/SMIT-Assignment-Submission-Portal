import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Container } from '@mui/material';

export default function SimpleAlert({ severity, message }) {
  return (
    <Container 
      sx={{
        position: 'fixed',
        top: 30,
        left: 0,
        right : 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1300, // Ensure it stays above other content
        mt: 0,
      }}
    >
      <Alert
        variant="filled"
        severity={severity}
        sx={{ 
          width: '30vw', 
          boxShadow: 1, 
        }}
      >
        {message}
      </Alert>
    </Container>
  );
}
