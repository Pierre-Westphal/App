import React, { createContext, useState, useEffect } from 'react';
import keycloak from '../Keycloak/Keycloak';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required', scope: 'openid email profile' }).then((auth) => {
      setAuthenticated(auth);

      if (auth) {
        localStorage.setItem('access_token', keycloak.token);
        localStorage.setItem('refresh_token', keycloak.refreshToken);
              
        keycloak.loadUserInfo().then((user) => {
          setUserInfo(user);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }).catch(error => {
      console.error('Failed to initialize Keycloak', error);
      setLoading(false);
    });
  }, []);

  const logout = () => {
    keycloak.logout();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('languageCode');
    localStorage.removeItem('ssoUserId');

    setAuthenticated(false);
    setUserInfo(null);
  };

  const login = () => {
    keycloak.login();
    keycloak.loadUserInfo().then((user) => {
      setUserInfo(user);
      setLoading(false);
    });
  };

  if (loading) {
    return <div>Loading...</div>;  // Afficher un indicateur de chargement pendant l'initialisation
  }

  return (
    <AuthContext.Provider value={{ authenticated, userInfo, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};