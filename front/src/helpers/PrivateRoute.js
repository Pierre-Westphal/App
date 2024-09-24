import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);
  console.log(authenticated);

  if (loading) {
    return <div>Loading...</div>;  // Afficher l'indicateur de chargement
  }
  console.log(children)
  return authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
