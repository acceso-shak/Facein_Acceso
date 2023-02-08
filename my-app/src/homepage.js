import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLoggedIn, logoutUser } from './components/session';
import { useNavigate} from "react-router-dom";


// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';



export default function Homepage() {

  const loggedIn = useLoggedIn();
  const navigate = useNavigate();

  function logout(){
    logoutUser();
    navigate("/login");
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Face IN
          </Typography>
          <Button color="inherit" href="about">about</Button>
          {
            loggedIn && (
              <Button color="inherit" onClick={logout}>Logout</Button>
            )
          }
          {
            !loggedIn && (
              <>
              <Button color="inherit" href="/Login">Login</Button>
              <Button color="inherit" href="/signup">Signup</Button>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

