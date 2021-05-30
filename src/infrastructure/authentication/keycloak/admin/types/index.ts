export type Method = <T, U>(...args: T[]) => U;

export interface Methods {
  [keys: string]: [val: Method] | any;
}

export interface UserKc {
  id?: string;
  username?: string;
  enabled?: boolean;
  emailVerified?: boolean;
  disableableCredentialTypes?: string[];
  attributes?: Record<string, any>;
  clientRoles?: Record<string, any>;
  credentials?: CredentialRepresentation[];
  email?: string;
  firstName?: string;
  lastName?: string;
  groups?: string[];
  origin?: string;
  realmRoles?: string[];
}

export interface CredentialRepresentation {
  algorithm?: string;
  config?: Record<string, any>;
  counter?: number;
  createdDate?: number;
  device?: string;
  digits?: number;
  hashIterations?: number;
  hashedSaltedValue?: string;
  period?: number;
  salt?: string;
  temporary?: boolean;
  type?: string;
  value?: string;
}
