import { Transform } from 'class-transformer';
import { IsEmail, MinLength, IsNotEmpty, IsString } from 'class-validator';
import { lowerCaseTransformer } from 'libs/utils/transformers/lower-case.transformer';

export class AuthLoginDto {
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
