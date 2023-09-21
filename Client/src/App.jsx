import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {Outlet} from 'react-router-dom'

import Box from '@mui/material/Box';

import SideBar from './Components/SideBar'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box sx={{ display: 'flex' }}>
        <SideBar/>
        <Outlet/>
      </Box>

    </ThemeProvider>
  );
}

export default App;
