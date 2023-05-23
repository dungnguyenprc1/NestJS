import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/user/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    super();
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    console.log('email', email);
    const user: User = await this.userModel.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      console.log('user123', user);

      throw new UnauthorizedException();
    }

    return user;
  }
}
