import { KeycloakConfig } from 'keycloak-connect';

export const config = (): KeycloakConfig => ({
  realm: process.env.KEYCLOAK_REALM || 'master',
  'auth-server-url': process.env.KEYCLOAK_HOST || 'http://localhost:8080/auth/',
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_RESOURCE || 'myclient',
  'confidential-port': 0,
  'bearer-only': true,
});
