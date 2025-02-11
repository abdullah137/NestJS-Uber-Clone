import { registerAs } from '@nestjs/config';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import validateConfig from 'libs/utils/validate-config';
import { AppConfig } from './types/app.config.type';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.APP_PORT)
  @IsNumber()
  APP_PORT: number;

  @ValidateIf((envValues) => envValues.API_PREFIX)
  @IsString()
  API_PREFIX: string;

  @ValidateIf((envValues) => envValues.BCRYPT_SALT)
  @IsNumber()
  BCRYPT_SALT: number;

  @ValidateIf((envValues) => envValues.NODE_ENV)
  @IsString()
  NODE_ENV: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_DOMAIN: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10) || 10,
    minPasswordLength: 8,
    frontendDomain: process.env.FRONTEND_DOMAIN,
    backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',
    maxPasswordLength: 24,
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
    apiPrefix: process.env.API_PREFIX,
    nodeEnv: process.env.NODE_ENV,
  };
});
