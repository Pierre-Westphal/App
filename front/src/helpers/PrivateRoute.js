import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) {
    toast.error('ERROR');
    return <Navigate to="/" />;
  }

  return children
};

export default PrivateRoute;
