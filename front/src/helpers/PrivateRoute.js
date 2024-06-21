import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;
  !isLoggedIn && toast.error('ERROR');

  return isLoggedIn ? children : <Navigate to={'/'} />;
};

export default PrivateRoute;
