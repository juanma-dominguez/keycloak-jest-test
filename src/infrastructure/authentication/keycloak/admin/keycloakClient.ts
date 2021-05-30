import { Method, Methods } from '@infrastructure/authentication/keycloak/admin/types';
import { logger } from '@logger';
import { createDecoder } from 'fast-jwt';
import KcAdminClient from 'keycloak-admin';

const jwtDecoder = createDecoder();

class KcClient {
  client;
  baseUrl: string = process.env.KEYCLOAK_HOST ?? '';
  realmName: string = process.env.KEYCLOAK_REALM ?? '';
  token = '';
  accessTokenExpireTime = 0;
  kcMethods = [
    'users.create',
    'users.find',
    'users.count',
    'users.findOne',
    'users.listGroups',
    'users.addToGroup',
    'users.delFromGroup',
    'users.update',
    'users.del',
    'users.resetPassword',
    'users.executeActionsEmail',
    'groups.find',
    'realms.findOne',
  ];

  constructor(KcAdmin: typeof KcAdminClient) {
    this.client = new KcAdmin({ baseUrl: this.baseUrl, realmName: this.realmName });
  }
  setTokenExpireTime(token: string): void {
    this.accessTokenExpireTime = jwtDecoder(token).exp * 1000;
  }

  isExpiredToken(): boolean {
    return Date.now() >= this.accessTokenExpireTime;
  }

  wrapFunc(fn: Method) {
    return async (...args: string[]) => {
      try {
        if (this.isExpiredToken()) {
          await this.auth();
          logger('info', 'keycloak refresh token');
        }
        return fn(...args);
      } catch (error) {
        return error;
      }
    };
  }

  wrapKcMethods() {
    return this.kcMethods.reduce((acc: Methods, method) => {
      const [source, endpoint] = method.split('.');
      acc[source] ?? (acc[source] = {});
      //@ts-ignore
      acc[source][endpoint] = this.wrapFunc(this.client[source][endpoint]);
      return acc;
    }, {});
  }

  api(): Methods {
    return this.wrapKcMethods();
  }

  async auth(): Promise<void> {
    try {
      await this.client.auth({
        grantType: 'client_credentials',
        clientSecret: process.env.KEYCLOAK_SECRET,
        clientId: process.env.KEYCLOAK_RESOURCE ?? 'mlops',
      });
      const jwtToken = await this.client.getAccessToken();
      this.token = jwtToken;
      this.setTokenExpireTime(jwtToken);
    } catch (error) {
      return error;
    }
  }
}

const client = new KcClient(KcAdminClient);

export const kcApi = client.api();
