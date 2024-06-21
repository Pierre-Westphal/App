import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://host.docker.internal:8088/auth",
 realm: "local",
 clientId: "client",
});

export default keycloak;