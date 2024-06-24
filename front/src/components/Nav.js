import '../style/global.css';
import * as React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Button, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import AuthContext from '../context/AuthContext';
const Nav = () => {
  const { keycloak } = useKeycloak();
  const Auth = React.useContext(AuthContext);
  const pages = [
    { name: 'HomePage', link: '/' },
    { name: 'SecurePage', link: '/secured' },
    { name: 'Form', link: '/form' },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
  };

  return (
    <>
      <AppBar position='static'>
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
            {!keycloak.authenticated && (
              <Button variant='contained' onClick={() => login()}>
                Login
              </Button>
            )}
            {!!keycloak.authenticated && (
              <Button variant='contained' onClick={() => logout()}>
                Logout ({keycloak.tokenParsed.preferred_username})
              </Button>
            )}
          </>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
