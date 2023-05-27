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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/roles.guard';

// const sequelizeConfig = require('./sequelize.config');

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '36060s' },
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [UserService, JwtStrategy, RolesGuard],
  controllers: [UserController],
  exports: [PassportModule, JwtModule, JwtStrategy],
})
export class UserModule {}
