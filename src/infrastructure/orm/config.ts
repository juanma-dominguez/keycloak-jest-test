import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const shouldLog = () => process.env.NODE_ENV === 'dev' ?? false;
const shouldMigrate = () => process.env.API_DATABASE_MIGRATIONS === 'true' ?? false;

export default {
  type: 'postgres',
  host: process.env.API_DATABASE_SERVER,
  port: 5432,
  username: process.env.API_DATABASE_USERNAME,
  password: process.env.API_DATABASE_PASSWORD,
  database: process.env.API_DATABASE_NAME,
  entities: [join(__dirname, '/entity/**/*{.ts,.js}')],
  synchronize: false,
  logging: shouldLog(),
  migrationsRun: shouldMigrate(),
  migrations: [join(__dirname, '/migration/**/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/infrastructure/orm/migration',
  },
} as ConnectionOptions;
