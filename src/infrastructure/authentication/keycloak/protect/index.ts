import KeycloakConnect, { KeycloakConfig } from 'keycloak-connect';
import { config } from './config';

const connect = (options: KeycloakConfig) => {
  return new KeycloakConnect({}, options);
};

export const keycloak = connect(config());
