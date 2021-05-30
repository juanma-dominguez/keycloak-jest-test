import { logger } from '@logger';
import { Connection, createConnection, getRepository, Repository } from 'typeorm';
import config from './config';

let connection: Connection;

export const runDB = async (): Promise<void> => {
  connection = await createConnection(config);
  logger('info', 'DataBase connected!!!');
};

export const stopDB = async (): Promise<void> => {
  await connection.close();
  logger('info', 'DataBase close!!!');
};

export const dbRepositories = <T>(): { [keys: string]: Repository<T> } => {
  return connection.entityMetadatas.reduce(
    (acc, entity) => Object.assign(acc, { [entity.name]: getRepository(entity.name) }),
    {},
  );
};
