import Keycloak from 'keycloak-js';

const keycloakConfig = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'local',
  clientId: 'client',
});

export default keycloakConfig;
