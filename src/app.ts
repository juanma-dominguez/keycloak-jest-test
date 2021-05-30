import { runDB, stopDB } from '@infrastructure/orm';
import { runServer, stopServer } from '@infrastructure/server';
import { logger } from '@logger';
import { checkStartup } from './preset';

const startApplication = async () => {
  try {
    await runDB();
    runServer();
  } catch (error) {
    logger('error', error);
  }
};

const closeApplication = async () => {
  await stopDB();
  stopServer();
  logger('info', 'Service successfully closed.');
};

const requiredEnvVariables = ['SERVER_PORT', 'LOGGER_LEVEL'];

checkStartup(requiredEnvVariables);

process.on('SIGINT', async () => closeApplication());
process.on('SIGTERM', async () => closeApplication());

startApplication();
