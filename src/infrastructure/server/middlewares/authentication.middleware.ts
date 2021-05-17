import { keycloak } from '@infrastructure/authentication';
import express from 'express';
import { GaurdFn } from 'keycloak-connect';

export const authenticationMiddleware = (options?: { admin?: string; logout?: string }): express.RequestHandler[] =>
  keycloak.middleware(options);
export const authorization = (options?: GaurdFn | string): express.RequestHandler => keycloak.protect(options);
