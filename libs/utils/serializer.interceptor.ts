import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import deepResolvePromises from './deep-resolver';
import { map } from 'rxjs/operators';

@Injectable()
export class ResolvePromiseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data) => deepResolvePromises(data)));
  }
}
