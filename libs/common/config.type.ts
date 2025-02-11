//TODO: CHANGE THE PATH FOR THE DATBASE
import { DatabaseConfig } from 'apps/auth/src/database/config/database-config.type';
import { AppConfig } from './types/app.config.type';
import { JwtConfig } from './types/jwt.config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: JwtConfig;
  database: DatabaseConfig;
};
