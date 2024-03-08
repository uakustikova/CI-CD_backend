import dotenvFlow from 'dotenv-flow';
import { Options } from 'sequelize/types';

dotenvFlow.config();

type RequiredOptions = Required<
  Pick<
    Options,
    'username' | 'password' | 'database' | 'host' | 'port' | 'dialect'
  >
> &
  Options;
const baseConfig: RequiredOptions = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT || 5431),
  dialect: 'postgres',
};

const dbConfig: Record<
  'test' | 'development' | 'production',
  RequiredOptions
> = {
  development: baseConfig,
  production: baseConfig,
  test: {
    database: 'share_image_app',
    username: 'root',
    password: 'root',
    host: 'localhost',
    port: Number(process.env.DB_PORT || 5431),
    dialect: 'postgres',
  },
};

export default dbConfig;