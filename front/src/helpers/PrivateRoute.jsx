import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';

const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;  // Afficher l'indicateur de chargement
  }
  return authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
