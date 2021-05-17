import { logger } from './config';

type LogTypes = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'mark';

export const appLogger = (logType: LogTypes, message: string): void => logger[logType](`[app] - ${message}`);
export const serverLogger = (logType: LogTypes, message: string): void => logger[logType](`[server] - ${message}`);
export const projectEndpointsLogger = (logType: LogTypes, message: string): void =>
  logger[logType](`[project.endpoints] - ${message}`);
