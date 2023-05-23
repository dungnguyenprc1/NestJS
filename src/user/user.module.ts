import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';
import { jwtConstants } from 'src/auth/constants';
import { AuthGuard } from 'src/auth/auth.guard';
import { ConfigService } from '@nestjs/config';

// const sequelizeConfig = require('./sequelize.config');

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      // secret: String(process.env.APP_JWT_SECRET),
      signOptions: { expiresIn: '36060s' },
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [PassportModule, JwtModule, JwtStrategy],
})
export class UserModule {}
