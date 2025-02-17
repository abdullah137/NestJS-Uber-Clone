import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import requestParser from 'libs/utils/request-logger-parser';

export default async function RequestLoggerMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const requestInfo = await requestParser(req);

  const logger = new Logger(RequestLoggerMiddleware.name);

  logger.log(requestInfo);

  next();
}
