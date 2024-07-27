import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Container } from '@mui/material';

export default function SimpleAlert({ severity, message }) {
  return (<Container sx={{ display: 'flex', justifyContent: 'center' }} >
    <Alert  variant="filled"  severity={severity} sx={{ width: '100vw' }}>
      {message}
    </Alert>
  </Container>
  );
}
