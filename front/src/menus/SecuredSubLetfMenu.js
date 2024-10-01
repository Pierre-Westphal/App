import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, CssBaseline, Box } from '@mui/material';
import  {Group, Settings, AccountCircle, Home} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const AppLayout = () => {
  const menuItems = [
    { text: 'Home', icon: <Home />, link: '/' },
    { text: 'Profile', icon: <AccountCircle />, link: '/secured/profile' },
    { text: 'Users', icon: <Group />, link: '/secured/users' },
    { text: 'User Creation', icon: <AccountCircle />, link: '/secured/userCreation' },
    { text: 'Settings', icon: <Settings />, link: '/secured/settings' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default AppLayout;