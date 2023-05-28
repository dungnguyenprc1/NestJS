import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  statusCode: number;
  result: T;
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    console.log(
      this.reflector.get<string>('response_message', context.getHandler()),
    );
    return next.handle().pipe(
      map((result) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        result,
        message:
          this.reflector.get<string>(
            'response_message',
            context.getHandler(),
          ) || '',
      })),
    );
  }
}
