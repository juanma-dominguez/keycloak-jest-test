import { config } from 'dotenv';
import { resolve } from 'path';

module.exports = async () => {
  config({ path: resolve(__dirname, '../env/.env.test') });
};
