import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Container } from '@mui/material';

export default function SimpleAlert() {
  return ( <Container sx={{display : 'flex', justifyContent : 'center'}} >
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{width : '80%'}}>
      Here is a gentle confirmation that your action was successful.
    </Alert>
    </Container>
  );
}
