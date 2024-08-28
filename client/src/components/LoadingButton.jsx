import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';

const LoadButton = ({loading,type}) => {

     
  
    return (
      <LoadingButton
        loading={loading}
        variant="contained"
        color="primary"
        loadingPosition="start"
        startIcon={<LoginIcon />}
        type={type}
      >
        Login
      </LoadingButton>
    );
}

export default LoadButton