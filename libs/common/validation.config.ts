import { ValidatorOptions } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export const ValidationConfig: ValidatorOptions | Record<string, any> = {
  whitelist: true,
  errorHttpStatuscode: HttpStatus.UNPROCESSABLE_ENTITY,
  forbidNonWhitelisted: true,
  disableErrorMessages: false,
  skipMissingProperties: false,
};
