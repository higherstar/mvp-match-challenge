// Dependencies
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Loggers
import { TypeORMLogger } from '../../modules/logger/logger.typeorm';

// Strategy
import { CustomNamingStrategy } from './custom-naming-strategy';

// Constants
const LOGGING_LEVELS = [
  'error',
  // 'query', // TODO: uncomment for debugging
];

const getSslConfig = () => {
  const isLocalhost = process.env.DATABASE_URL.includes('@localhost');
  return isLocalhost
    ? {}
    : {
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      };
};

const getConfig = (env = '.env'): TypeOrmModuleOptions => {
  // eslint-disable-next-line
  const envConfig = require('dotenv').config({ path: path.resolve(process.cwd(), env) }).parsed;

  return {
    type: 'postgres',
    url: envConfig?.DATABASE_URL || process.env.DATABASE_URL,
    synchronize: false,
    namingStrategy: new CustomNamingStrategy(),
    ...getSslConfig(),
    logger: new TypeORMLogger(),
    entities: [__dirname + '/../../**/**.entity{.ts,.js}'],
    migrations: [__dirname + '/../../database/seeds/**/*.ts', __dirname + '/../../database/migrations/**/*.ts'],
    cli: {
      entitiesDir: path.resolve(__dirname, '..', 'entity'),
      migrationsDir: path.resolve(__dirname, '..', 'migrations'),
    },
  };
};

//  Export config
export { LOGGING_LEVELS, getConfig };
