import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(token);

    if (!token) {
      console.log(123);
    }
    try {
      console.log(
        'errror',
        this.jwtService.verifyAsync(token, {
          // secret: jwtConstants.secret,
        }),
      );

      const payload = await this.jwtService.verifyAsync(token, {
        // secret: jwtConstants.secret,
      });
      console.log(payload);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      //   request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log('check', [type, token]);
    return type === 'Bearer' ? token : undefined;
  }
}
