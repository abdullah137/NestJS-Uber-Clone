import { registerAs } from '@nestjs/config';
import { IsString, ValidateIf } from 'class-validator';
import validateConfig from 'libs/utils/validate-config';
import { JwtConfig } from './types/jwt.config.type';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.JWT_SECRET_KEY)
  @IsString()
  JWT_SECRET_KEY: string;

  @ValidateIf((envValues) => envValues.AUTH_JWT_TOKEN_EXPIRES_IN)
  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;

  @ValidateIf((envValues) => envValues.REFRESH_TOKEN)
  @IsString()
  REFRESH_TOKEN: string;

  @ValidateIf((envValues) => envValues.AUTH_REFRESH_TOKEN_EXPIRES_IN)
  @IsString()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;
}

export default registerAs<JwtConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    jwtSecretKey: process.env.AUTH_JWT_SECRET,
    jwtExpiresIn: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
    refreshToken: process.env.REFRESH_TOKEN,
    authRefreshTokenExpiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
  };
});
