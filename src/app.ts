import { runServer, stopServer } from '@infrastructure/server';
import { appLogger } from '@logger';
import { checkStartup } from './preset';

const startApplication = async () => {
  try {
    runServer();
  } catch ({ message }) {
    appLogger('error', 'Application stating error');
  }
};

const closeApplication = async () => {
  stopServer();
  appLogger('info', 'Service successfully closed.');
};

const requiredEnvVariables = ['SERVER_PORT', 'LOGGER_LEVEL'];

checkStartup(requiredEnvVariables);

process.on('SIGINT', async () => closeApplication());
process.on('SIGTERM', async () => closeApplication());

if (process.env.NODE_ENV !== 'test') {
  startApplication();
}
