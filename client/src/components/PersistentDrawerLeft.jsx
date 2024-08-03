import * as React from 'react';
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, CardMedia, Tooltip, Avatar, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import image from '../assets/smit.png';
import MuiAppBar from "@mui/material/AppBar";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ userInfo }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

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

  const menuItems = [
    { text: 'Assignments', icon: <InboxIcon /> },
    { text: 'Discussion', icon: <MailIcon /> },
    { text: 'Announcements', icon: <InboxIcon /> },
    { text: 'Course', icon: <MailIcon /> },
    { text: 'Notes', icon: <InboxIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: '#0b73b7' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!isMobile && `Welcome to ${userInfo ? userInfo.teacherName : 'loading'}'s Class`}
            <WavingHandIcon sx={{ ml: 1 }} />
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
                <Typography sx={{ px: 2 }} textAlign="center">{userInfo ? userInfo.name : '...loading'}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ px: 2 }} textAlign="center">Log Out</Typography>
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
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Link to='/student/home' style={{ width: '80%' }}>
              <CardMedia
                component="img"
                image={image}
                alt="Description"
                sx={{ width: '100%', height: 'auto', mb: 2 }}
              />
            </Link>
          </Box>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={`/student/${item.text.toLowerCase().replace(' ', '-')}`}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* Your main content goes here */}
      </Main>
    </Box>
  );
}