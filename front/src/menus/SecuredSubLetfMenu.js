import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, CssBaseline, Box } from '@mui/material';
import  {Group, Settings, AccountCircle, Home} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AppLayout = ({open = true}) => {
  
  const { t } = useTranslation();
  const drawerWidth = open ? 240 : 60;

  const menuItems = [
    { text: t('menu.home'), icon: <Home />, link: '/' },
    { text: t('menu.profile'), icon: <AccountCircle />, link: '/secured/profile' },
    { text: t('menu.users'), icon: <Group />, link: '/secured/users' },
    { text: t('menu.settings'), icon: <Settings />, link: '/secured/settings' },
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
            overflowX: 'hidden',
            transition: 'width 0.3s',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button="true" key={index} component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default AppLayout;