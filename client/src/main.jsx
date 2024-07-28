import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store/store';
import Navigation from './navigation/Navigation';
const theme = createTheme({
  typography: {
    fontFamily: 'Signika',
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <ThemeProvider theme={theme} >
    <Navigation />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)

