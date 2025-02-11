import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'crypto';
import * as argon from 'argon2';
import Deasyncify from 'deasyncify';
import {
  InvalidTokenException,
  InvalidTokenTypeException,
  TokenExpiredException,
} from './security.errors';
import { GenerateTokenArgs } from './security.interface';
import { LoggerService } from '../logger/custom.logger';

@Injectable()
export class SecurityService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  public async hashPassword(password: string) {
    try {
      return bcrypt.createHash(password);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return argon.verify(password, hashedPassword);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async generateToken({
    data,
    expiresIn = '8d',
  }: GenerateTokenArgs): Promise<string> {
    return this.jwtService.signAsync(
      { data },
      {
        expiresIn,
        algorithm: 'HS256',
      },
    );
  }
  public async verifyToken(token: string) {
    const [decoded, err] = await Deasyncify.watch(
      this.jwtService.verifyAsync(token),
    );

    const data = {
      data: {
        ...decoded,
        token,
      },
      tokenType: 'ACCESS',
    };

    if (err != null) {
      if (err.name === 'TokenExpiredError') {
        throw new TokenExpiredException();
      }

      throw new InvalidTokenException();
    }

    if (data.tokenType == 'ACCESS' || data.tokenType == 'REFRESH') {
      return data;
    }

    throw new InvalidTokenTypeException();
  }
}
