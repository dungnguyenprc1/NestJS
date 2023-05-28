import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.model';

export const GetUser = createParamDecorator(
  (_data: string, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
