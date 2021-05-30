import { loggerConf } from './config';

type LogTypes = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'mark';

export const logger = (logType: LogTypes, message: string): void => loggerConf[logType](message);
