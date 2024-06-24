import { useKeycloak } from '@react-keycloak/web';

export default logout = () => {
  const { keycloak } = useKeycloak();
  keycloak.logout();
};
