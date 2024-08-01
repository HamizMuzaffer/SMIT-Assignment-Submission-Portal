import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { CardMedia } from '@mui/material';
import image from '../assets/smit.png'
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { fetchStudent } from '../features/user/userSlice';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function PersistentDrawerLeft() {
  const theme = useTheme();
const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
 
    try {
      const response = await axios.get("http://localhost:3000/student/logout");
      console.log('Logout response:', response.data);
      Cookies.remove('token');  
      setAnchorElUser(null);
      navigate('/student/login');
    } catch (error) {
      console.error("Error logging out:", error.response ? error.response.data : error.message);  
      Cookies.remove('token');  
      setAnchorElUser(null);
      navigate('/student/login');
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudent());
}, [dispatch]);
  const userInfo = useSelector((state) => state.user.info);

  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ height: '10vh', bgcolor: '#0b73b7' }}>
  <Toolbar>
    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
      Welcome to {userInfo ? userInfo.teacherName : 'loading'}'s Class <WavingHandIcon />
    </Typography>
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
          <MenuItem>
            <Typography sx={{px:2}} textAlign="center">{userInfo ? userInfo.name :'...loading'}</Typography>
          </MenuItem>

          <MenuItem  onClick={handleLogout}>
            <Typography sx={{px:2}} textAlign="center">Log Out</Typography>
          </MenuItem>
      </Menu>
    </Box>
  </Toolbar>
</AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
              component="img"
              image={image}
              alt="Description"
              sx={{ width: '60%', height: 'auto', mb: 2 }}
            />
          </Box>
          
        </DrawerHeader>
        <Divider />
        <List>
          {['Assignments', 'Discussion', 'Announcements'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={`/student/${text.toLowerCase().replace(' ', '-')}`}>
                <ListItemIcon >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Course', 'Notes'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={`/student/${text.toLowerCase().replace(' ', '-')}`}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          
        </Typography>
        <Typography paragraph>
          
        </Typography>
      </Main>
    </Box>
  );
}
