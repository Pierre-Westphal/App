import '../style/global.css';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { apiRequest } from "../commons/Request";
import { useTranslation } from 'react-i18next';


const Nav = () => {
  const { authenticated, userInfo, logout, login } = useContext(AuthContext);
  const pages = [{name: 'Home', link: '/'}];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  
  useEffect(() => {
    apiRequest(`user-sso-user-id/${userInfo.sub}`, 'GET', null).then((response) => {
      localStorage.setItem('userId', response.user_id)
      localStorage.setItem('ssoUserId', response.sso_user_id)
      localStorage.setItem('firstName', response.first_name)
      localStorage.setItem('lastName', response.last_name)
      localStorage.setItem('languageCode', response.language)
      localStorage.setItem('username', response.username)
      localStorage.setItem('email', response.email)
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
            <Button variant='contained' onClick={() => changeLanguage('fr')}>{t('change_language')} (FR)</Button>
            <Button variant='contained' onClick={() => changeLanguage('en')}>{t('change_language')} (EN)</Button>
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
