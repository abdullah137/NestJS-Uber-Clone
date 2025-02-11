import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { SecurityService } from '../security/security.service';
import { NextFunction, Request, Response } from 'express';
import {
  InvalidTokenException,
  InvalidTokenTypeException,
  TokenExpiredException,
} from '../security/security.errors';
import Deasyncify from 'deasyncify';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);

  constructor(private readonly securityService: SecurityService) {}

  public async use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    this.logger.log('AUTHENTICATING_REQUEST');

    const authorizationHeader = String(req.headers['authorization']);

    const token = authorizationHeader?.split?.(' ')?.[1];

    if (token == null) {
      throw new UnauthorizedException({
        status: false,
        error: 'NO_TOKEN_PARSED',
        message: 'No header token provided.',
      });
    }

    const decodedPayloadPromise = this.securityService.verifyToken(token);

    const [decodedPayload, err] = await Deasyncify.watch(decodedPayloadPromise);
    if (err != null) {
      if (
        err instanceof TokenExpiredException ||
        err instanceof InvalidTokenException ||
        err instanceof InvalidTokenTypeException
      ) {
        throw new UnauthorizedException(err.message);
      } else {
        throw err;
      }
    }

    (<any>req)['claim'] = decodedPayload;

    this.logger.log('=== AUTHENTICATED ===');

    next();
  }
}
