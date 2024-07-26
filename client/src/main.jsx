import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Navigation from './navigation/Navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Signika',
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
    <Navigation />
    </ThemeProvider>
  </React.StrictMode>,
)
