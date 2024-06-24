import { useKeycloak } from '@react-keycloak/web';

export default login = () => {
  const { keycloak } = useKeycloak();
  keycloak.login();
};
