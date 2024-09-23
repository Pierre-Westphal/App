import React, { createContext, useState, useEffect } from 'react';
import keycloak from '../Keycloak/Keycloak';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((auth) => {
      setAuthenticated(auth);
      if (auth) {
        keycloak.loadUserInfo().then((user) => {
          setUserInfo(user);
        });
      }
    });
  }, []);

  const logout = () => {
    keycloak.logout();
  };

  const login = () => {
    keycloak.login();
  };

  return (
    <AuthContext.Provider value={{ authenticated, userInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};