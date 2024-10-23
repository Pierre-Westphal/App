import '../style/global.css';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { apiRequest } from "../commons/Request";

const Nav = () => {
  const { authenticated, userInfo, logout, login } = useContext(AuthContext);
  const pages = [{name: 'Home', link: '/'}];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    console.log(userInfo)
    apiRequest(`user-sso-user-id/${userInfo.sub}`, 'GET', null).then((response) => {
      localStorage.setItem('languageCode', response)
    })
  }, []);

  return (
    <>
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant='dense'>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Demo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.link}
                href={page.link}
                onClick={() => handleCloseNavMenu(page.link)}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  borderRadius: 0,
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#00aeff',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <>
            {!authenticated  && (
              <Button variant='contained' onClick={() => login()}>
                Login
              </Button>
            )}
            {!!authenticated  && (
              <Button variant='contained' onClick={() => logout()}>
                Logout {userInfo && userInfo.preferred_username ? userInfo.preferred_username : ""}
              </Button>
            )}
          </>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
