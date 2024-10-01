import React, { createContext, useState, useEffect } from 'react';
import keycloak from '../Keycloak/Keycloak';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((auth) => {
      setAuthenticated(auth);
      if (auth) {
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
  };

  if (loading) {
    return <div>Loading...</div>;  // Afficher un indicateur de chargement pendant l'initialisation
  }

  return (
    <AuthContext.Provider value={{ authenticated, userInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};