import '../style/global.css';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { apiRequest } from "../commons/Request";
import { useTranslation } from 'react-i18next';


const Nav = () => {
  const { authenticated, userInfo, logout, login } = useContext(AuthContext);
  const pages = [{name: 'Home', link: '/'}];
  
  const { t } = useTranslation();

  useEffect(() => {
    apiRequest(`user-sso-user-id/${userInfo.sub}`, 'GET', null).then((response) => {
      localStorage.setItem('userId', response.userId)
      localStorage.setItem('ssoUserId', response.ssoUserId)
      localStorage.setItem('firstName', response.firstName)
      localStorage.setItem('lastName', response.lastName)
      localStorage.setItem('languageCode', response.language)
      localStorage.setItem('username', response.username)
      localStorage.setItem('email', response.email)
    })
  }, []);

  return (
    <>
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant='dense'>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {t('projectName')}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.link}
                href={page.link}
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
                {t('basic.login')}
              </Button>
            )}
            {!!authenticated  && (
              <Button variant='contained' onClick={() => logout()}>
                {t('basic.logout')} {userInfo && userInfo.preferred_username ? userInfo.preferred_username : ""}
              </Button>
            )}
          </>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
